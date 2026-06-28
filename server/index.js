import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import express from "express";
import multer from "multer";
import Database from "better-sqlite3";
import { parse as parseCookie, serialize as serializeCookie } from "cookie";

const app = express();
const port = Number(process.env.PORT || 3001);
const rootDir = path.resolve(process.cwd());
const storageDir = path.join(rootDir, "storage");
const uploadsDir = path.join(storageDir, "uploads");
const dbPath = path.join(storageDir, "news-panel.sqlite");
const distDir = path.join(rootDir, "dist");
const sessionCookieName = "turismo_admin_session";
const visitorCookieName = "turismo_visit_session";
const sessionMaxAgeSeconds = 60 * 60 * 24 * 7;
const visitorMaxAgeSeconds = 60 * 60 * 24;
const defaultAdmins = [
  {
    name: "Administrador Turismo Itatinga",
    email: "admin@turismoitatinga.com.br",
    password: "Itatinga@2026",
    role: "admin",
  },
  {
    name: "Editor Turismo Itatinga",
    email: "editor@turismoitatinga.com.br",
    password: "Inventario@2026",
    role: "editor",
  },
];

fs.mkdirSync(uploadsDir, { recursive: true });

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'admin',
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    admin_id INTEGER NOT NULL,
    token TEXT NOT NULL UNIQUE,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS managed_news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    published_at TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT,
    source_url TEXT,
    created_by INTEGER,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES admins(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS site_stats (
    key TEXT PRIMARY KEY,
    value INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  INSERT OR IGNORE INTO site_stats (key, value) VALUES ('visits', 0);
`);

const adminColumns = db.prepare("PRAGMA table_info(admins)").all();
const hasRoleColumn = adminColumns.some((column) => column.name === "role");
if (!hasRoleColumn) {
  db.exec("ALTER TABLE admins ADD COLUMN role TEXT NOT NULL DEFAULT 'admin'");
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname || "").toLowerCase() || ".jpg";
      cb(null, `${Date.now()}-${crypto.randomUUID()}${ext}`);
    },
  }),
  limits: { fileSize: 8 * 1024 * 1024 },
});

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadsDir));

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function formatDateLabel(date) {
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return formatter.format(new Date(`${date}T12:00:00`)).replaceAll(".", "");
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = String(stored || "").split(":");
  if (!salt || !hash) return false;
  const candidate = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(candidate, "hex"));
}

function ensureDefaultAdmins() {
  const insertAdmin = db.prepare(`
    INSERT INTO admins (name, email, role, password_hash)
    VALUES (?, ?, ?, ?)
  `);
  const updateAdmin = db.prepare(`
    UPDATE admins
    SET name = ?, role = ?, password_hash = ?
    WHERE email = ?
  `);
  const getAdmin = db.prepare("SELECT id FROM admins WHERE email = ?");

  for (const account of defaultAdmins) {
    const passwordHash = hashPassword(account.password);
    const existing = getAdmin.get(account.email);
    if (existing) {
      updateAdmin.run(account.name, account.role, passwordHash, account.email);
    } else {
      insertAdmin.run(account.name, account.email, account.role, passwordHash);
    }
  }
}

ensureDefaultAdmins();

function sanitizeNews(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    date: row.published_at,
    dateLabel: formatDateLabel(row.published_at),
    image: row.cover_image || "/images/conheca-itatinga.jpg",
    summary: row.summary,
    content: JSON.parse(row.content),
    officialUrl: row.source_url || "",
    source: "panel",
    updatedAt: row.updated_at,
  };
}

function getCookie(req, name) {
  const cookies = parseCookie(req.headers.cookie || "");
  return cookies[name];
}

function setSessionCookie(res, token) {
  res.setHeader("Set-Cookie", serializeCookie(sessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: sessionMaxAgeSeconds,
    secure: process.env.NODE_ENV === "production",
  }));
}

function clearSessionCookie(res) {
  res.setHeader("Set-Cookie", serializeCookie(sessionCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    secure: process.env.NODE_ENV === "production",
  }));
}

function getAuthenticatedAdmin(req) {
  const token = getCookie(req, sessionCookieName);
  if (!token) return null;
  const session = db.prepare(`
    SELECT admins.id, admins.name, admins.email, sessions.id AS session_id, sessions.expires_at
    FROM sessions
    JOIN admins ON admins.id = sessions.admin_id
    WHERE sessions.token = ?
  `).get(token);
  if (!session) return null;
  if (new Date(session.expires_at) <= new Date()) {
    db.prepare("DELETE FROM sessions WHERE id = ?").run(session.session_id);
    return null;
  }
  return { id: session.id, name: session.name, email: session.email, token };
}

function requireAuth(req, res, next) {
  const admin = getAuthenticatedAdmin(req);
  if (!admin) {
    clearSessionCookie(res);
    return res.status(401).json({ error: "Sessão inválida ou expirada." });
  }
  req.admin = admin;
  return next();
}

function cleanupLocalImage(imagePath) {
  if (!imagePath || !imagePath.startsWith("/uploads/")) return;
  const fullPath = path.join(uploadsDir, path.basename(imagePath));
  if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/news", (_req, res) => {
  const rows = db.prepare("SELECT * FROM managed_news ORDER BY published_at DESC, id DESC").all();
  res.json(rows.map(sanitizeNews));
});

app.get("/api/news/:slug", (req, res) => {
  const row = db.prepare("SELECT * FROM managed_news WHERE slug = ?").get(req.params.slug);
  if (!row) return res.status(404).json({ error: "Notícia não encontrada." });
  return res.json(sanitizeNews(row));
});

app.get("/api/visits", (_req, res) => {
  const row = db.prepare("SELECT value FROM site_stats WHERE key = 'visits'").get();
  res.json({ visits: row?.value || 0 });
});

app.post("/api/visits", (req, res) => {
  const existingVisitor = getCookie(req, visitorCookieName);
  if (!existingVisitor) {
    db.prepare(`
      UPDATE site_stats
      SET value = value + 1, updated_at = CURRENT_TIMESTAMP
      WHERE key = 'visits'
    `).run();
    res.setHeader("Set-Cookie", serializeCookie(visitorCookieName, crypto.randomUUID(), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: visitorMaxAgeSeconds,
      secure: process.env.NODE_ENV === "production",
    }));
  }

  const row = db.prepare("SELECT value FROM site_stats WHERE key = 'visits'").get();
  res.json({ visits: row?.value || 0 });
});

app.get("/api/admin/bootstrap", (_req, res) => {
  const adminCount = db.prepare("SELECT COUNT(*) AS count FROM admins").get().count;
  res.json({ requiresSetup: adminCount === 0 });
});

app.post("/api/admin/setup", (req, res) => {
  const adminCount = db.prepare("SELECT COUNT(*) AS count FROM admins").get().count;
  if (adminCount > 0) return res.status(409).json({ error: "O administrador inicial já foi configurado." });

  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");

  if (name.length < 3 || !email.includes("@") || password.length < 8) {
    return res.status(422).json({ error: "Preencha nome, e-mail válido e senha com pelo menos 8 caracteres." });
  }

  const passwordHash = hashPassword(password);
  const result = db.prepare("INSERT INTO admins (name, email, password_hash) VALUES (?, ?, ?)").run(name, email, passwordHash);
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + sessionMaxAgeSeconds * 1000).toISOString();
  db.prepare("INSERT INTO sessions (admin_id, token, expires_at) VALUES (?, ?, ?)").run(result.lastInsertRowid, token, expiresAt);
  setSessionCookie(res, token);
  return res.status(201).json({ admin: { id: result.lastInsertRowid, name, email, role: "admin" } });
});

app.post("/api/admin/login", (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");
  const admin = db.prepare("SELECT * FROM admins WHERE email = ?").get(email);
  if (!admin || !verifyPassword(password, admin.password_hash)) {
    return res.status(401).json({ error: "E-mail ou senha inválidos." });
  }
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + sessionMaxAgeSeconds * 1000).toISOString();
  db.prepare("INSERT INTO sessions (admin_id, token, expires_at) VALUES (?, ?, ?)").run(admin.id, token, expiresAt);
  setSessionCookie(res, token);
  return res.json({ admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } });
});

app.post("/api/admin/logout", requireAuth, (req, res) => {
  db.prepare("DELETE FROM sessions WHERE token = ?").run(req.admin.token);
  clearSessionCookie(res);
  res.json({ ok: true });
});

app.get("/api/admin/me", (req, res) => {
  const admin = getAuthenticatedAdmin(req);
  if (!admin) return res.status(401).json({ error: "Não autenticado." });
  const row = db.prepare("SELECT id, name, email, role FROM admins WHERE id = ?").get(admin.id);
  return res.json({ admin: row });
});

app.get("/api/admin/news", requireAuth, (_req, res) => {
  const rows = db.prepare("SELECT * FROM managed_news ORDER BY published_at DESC, id DESC").all();
  res.json(rows.map(sanitizeNews));
});

app.post("/api/admin/news", requireAuth, upload.single("coverFile"), (req, res) => {
  const title = String(req.body.title || "").trim();
  const slugBase = String(req.body.slug || "").trim() || title;
  const slug = slugify(slugBase);
  const category = String(req.body.category || "").trim();
  const date = String(req.body.date || "").trim();
  const summary = String(req.body.summary || "").trim();
  const sourceUrl = String(req.body.officialUrl || "").trim();
  const coverImageUrl = String(req.body.coverImageUrl || "").trim();
  const paragraphs = String(req.body.content || "")
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (!title || !slug || !category || !date || !summary || paragraphs.length === 0) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(422).json({ error: "Preencha título, categoria, data, resumo e conteúdo." });
  }

  const existing = db.prepare("SELECT id FROM managed_news WHERE slug = ?").get(slug);
  if (existing) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(409).json({ error: "Já existe uma notícia com este link amigável." });
  }

  const coverImage = req.file ? `/uploads/${req.file.filename}` : coverImageUrl;
  const result = db.prepare(`
    INSERT INTO managed_news (title, slug, category, published_at, summary, content, cover_image, source_url, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(title, slug, category, date, summary, JSON.stringify(paragraphs), coverImage, sourceUrl, req.admin.id);

  const row = db.prepare("SELECT * FROM managed_news WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(sanitizeNews(row));
});

app.put("/api/admin/news/:id", requireAuth, upload.single("coverFile"), (req, res) => {
  const row = db.prepare("SELECT * FROM managed_news WHERE id = ?").get(req.params.id);
  if (!row) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(404).json({ error: "Notícia não encontrada." });
  }

  const title = String(req.body.title || "").trim();
  const slugBase = String(req.body.slug || "").trim() || title;
  const slug = slugify(slugBase);
  const category = String(req.body.category || "").trim();
  const date = String(req.body.date || "").trim();
  const summary = String(req.body.summary || "").trim();
  const sourceUrl = String(req.body.officialUrl || "").trim();
  const coverImageUrl = String(req.body.coverImageUrl || "").trim();
  const paragraphs = String(req.body.content || "")
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (!title || !slug || !category || !date || !summary || paragraphs.length === 0) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(422).json({ error: "Preencha título, categoria, data, resumo e conteúdo." });
  }

  const duplicate = db.prepare("SELECT id FROM managed_news WHERE slug = ? AND id != ?").get(slug, req.params.id);
  if (duplicate) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(409).json({ error: "Já existe outra notícia com este link amigável." });
  }

  let coverImage = row.cover_image;
  if (req.file) {
    cleanupLocalImage(row.cover_image);
    coverImage = `/uploads/${req.file.filename}`;
  } else if (coverImageUrl) {
    if (coverImageUrl !== row.cover_image) cleanupLocalImage(row.cover_image);
    coverImage = coverImageUrl;
  }

  db.prepare(`
    UPDATE managed_news
    SET title = ?, slug = ?, category = ?, published_at = ?, summary = ?, content = ?, cover_image = ?, source_url = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(title, slug, category, date, summary, JSON.stringify(paragraphs), coverImage, sourceUrl, req.params.id);

  const updated = db.prepare("SELECT * FROM managed_news WHERE id = ?").get(req.params.id);
  res.json(sanitizeNews(updated));
});

app.delete("/api/admin/news/:id", requireAuth, (req, res) => {
  const row = db.prepare("SELECT * FROM managed_news WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: "Notícia não encontrada." });
  cleanupLocalImage(row.cover_image);
  db.prepare("DELETE FROM managed_news WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get("/{*any}", (req, res, next) => {
    if (req.path.startsWith("/api/") || req.path.startsWith("/uploads/")) return next();
    return res.sendFile(path.join(distDir, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Turismo Itatinga server listening on http://localhost:${port}`);
});

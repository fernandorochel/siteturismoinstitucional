import { useEffect, useMemo, useState } from "react";
import { ArrowSquareOut, FloppyDisk, NotePencil, Plus, SignOut, Trash, UserCircle } from "@phosphor-icons/react";

const newsCategories = [
  "EVENTOS",
  "FESTA DO PEÃO",
  "AGENDA TURÍSTICA",
  "EVENTO ESPORTIVO",
  "TURISMO RURAL",
  "CIDADE DO MEL",
  "GUIA DA CIDADE",
  "ATRATIVOS",
  "VISITA TÉCNICA",
  "BASTIDORES DO TURISMO",
  "CURSO E CAPACITAÇÃO",
  "TRANSPORTE DISPONÍVEL",
];

const emptyForm = {
  id: null,
  title: "",
  slug: "",
  category: "EVENTOS",
  date: new Date().toISOString().slice(0, 10),
  summary: "",
  content: "",
  officialUrl: "",
  coverImageUrl: "",
  coverFile: null,
};

async function request(url, options = {}) {
  const response = await fetch(url, {
    credentials: "include",
    ...options,
  });

  let payload = null;
  const type = response.headers.get("content-type") || "";
  if (type.includes("application/json")) {
    payload = await response.json();
  }

  if (!response.ok) {
    throw new Error(payload?.error || "Não foi possível concluir a operação.");
  }

  return payload;
}

function toTextareaContent(article) {
  return Array.isArray(article.content) ? article.content.join("\n\n") : "";
}

export function AdminNewsPage({ onNewsUpdated }) {
  const [requiresSetup, setRequiresSetup] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [setupForm, setSetupForm] = useState({ name: "", email: "", password: "" });
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const formTitle = useMemo(
    () => (form.id ? "Editar notícia" : "Nova notícia"),
    [form.id],
  );

  useEffect(() => {
    (async () => {
      try {
        const bootstrap = await request("/api/admin/bootstrap");
        setRequiresSetup(Boolean(bootstrap.requiresSetup));
        if (!bootstrap.requiresSetup) {
          const session = await request("/api/admin/me");
          setAdmin(session.admin);
        }
      } catch {
        setAdmin(null);
      } finally {
        setCheckingSession(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!admin) return;
    loadItems();
  }, [admin]);

  async function loadItems() {
    setLoadingItems(true);
    try {
      const data = await request("/api/admin/news");
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingItems(false);
    }
  }

  function resetMessages() {
    setError("");
    setFeedback("");
  }

  function resetForm() {
    setForm({
      ...emptyForm,
      date: new Date().toISOString().slice(0, 10),
    });
  }

  async function handleSetup(event) {
    event.preventDefault();
    resetMessages();
    try {
      const response = await request("/api/admin/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(setupForm),
      });
      setAdmin(response.admin);
      setRequiresSetup(false);
      setFeedback("Administrador inicial criado com sucesso.");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    resetMessages();
    try {
      const response = await request("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      setAdmin(response.admin);
      setFeedback("Login realizado com sucesso.");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleLogout() {
    resetMessages();
    try {
      await request("/api/admin/logout", { method: "POST" });
      setAdmin(null);
      setItems([]);
      resetForm();
      setFeedback("Sessão encerrada.");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSave(event) {
    event.preventDefault();
    resetMessages();
    setSaving(true);
    try {
      const body = new FormData();
      body.append("title", form.title);
      body.append("slug", form.slug);
      body.append("category", form.category);
      body.append("date", form.date);
      body.append("summary", form.summary);
      body.append("content", form.content);
      body.append("officialUrl", form.officialUrl);
      body.append("coverImageUrl", form.coverImageUrl);
      if (form.coverFile) body.append("coverFile", form.coverFile);

      const url = form.id ? `/api/admin/news/${form.id}` : "/api/admin/news";
      const method = form.id ? "PUT" : "POST";
      const saved = await request(url, { method, body });

      setItems((current) => {
        const next = current.filter((item) => item.id !== saved.id);
        return [saved, ...next].sort((a, b) => b.date.localeCompare(a.date));
      });
      setFeedback(form.id ? "Notícia atualizada com sucesso." : "Notícia cadastrada com sucesso.");
      resetForm();
      onNewsUpdated?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(item) {
    resetMessages();
    setForm({
      id: item.id,
      title: item.title,
      slug: item.slug,
      category: item.category,
      date: item.date,
      summary: item.summary,
      content: toTextareaContent(item),
      officialUrl: item.officialUrl || "",
      coverImageUrl: item.image?.startsWith("/uploads/") ? "" : item.image || "",
      coverFile: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!window.confirm("Deseja excluir esta notícia?")) return;
    resetMessages();
    try {
      await request(`/api/admin/news/${id}`, { method: "DELETE" });
      setItems((current) => current.filter((item) => item.id !== id));
      setFeedback("Notícia excluída.");
      if (form.id === id) resetForm();
      onNewsUpdated?.();
    } catch (err) {
      setError(err.message);
    }
  }

  if (checkingSession) {
    return (
      <main id="conteudo" className="admin-page">
        <section className="admin-shell container">
          <div className="admin-auth-card">
            <p className="eyebrow">Painel de notícias</p>
            <h1>Carregando painel administrativo...</h1>
          </div>
        </section>
      </main>
    );
  }

  if (requiresSetup && !admin) {
    return (
      <main id="conteudo" className="admin-page">
        <section className="admin-shell container">
          <form className="admin-auth-card" onSubmit={handleSetup}>
            <p className="eyebrow">Primeiro acesso</p>
            <h1>Criar administrador do painel</h1>
            <p>Esse passo é feito apenas uma vez. Depois disso, o acesso será feito pelo login do painel.</p>
            <label>
              Nome
              <input value={setupForm.name} onChange={(event) => setSetupForm((current) => ({ ...current, name: event.target.value }))} required />
            </label>
            <label>
              E-mail
              <input type="email" value={setupForm.email} onChange={(event) => setSetupForm((current) => ({ ...current, email: event.target.value }))} required />
            </label>
            <label>
              Senha
              <input type="password" value={setupForm.password} onChange={(event) => setSetupForm((current) => ({ ...current, password: event.target.value }))} minLength={8} required />
            </label>
            {error ? <p className="admin-message error">{error}</p> : null}
            <button className="button primary admin-submit" type="submit">Criar acesso</button>
          </form>
        </section>
      </main>
    );
  }

  if (!admin) {
    return (
      <main id="conteudo" className="admin-page">
        <section className="admin-shell container">
          <form className="admin-auth-card" onSubmit={handleLogin}>
            <p className="eyebrow">Painel real de notícias</p>
            <h1>Entrar no painel</h1>
            <p>Use o acesso administrativo para cadastrar, editar e publicar notícias do site institucional.</p>
            <label>
              E-mail
              <input type="email" value={loginForm.email} onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))} required />
            </label>
            <label>
              Senha
              <input type="password" value={loginForm.password} onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))} required />
            </label>
            {error ? <p className="admin-message error">{error}</p> : null}
            {feedback ? <p className="admin-message success">{feedback}</p> : null}
            <button className="button primary admin-submit" type="submit">Entrar</button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main id="conteudo" className="admin-page">
      <section className="admin-shell container">
        <div className="admin-topbar">
          <div>
            <p className="eyebrow">Painel administrativo</p>
            <h1>Cadastro real de notícias</h1>
            <p>Publique notícias com imagem de capa, resumo, categoria, data, link oficial e conteúdo interno do site.</p>
          </div>
          <div className="admin-userbox">
            <span><UserCircle /> {admin.name}</span>
            <button className="button outline" type="button" onClick={handleLogout}>Sair <SignOut /></button>
          </div>
        </div>

        {error ? <p className="admin-message error">{error}</p> : null}
        {feedback ? <p className="admin-message success">{feedback}</p> : null}

        <div className="admin-grid">
          <form className="admin-editor" onSubmit={handleSave}>
            <div className="admin-editor-header">
              <div>
                <p className="eyebrow">Editor</p>
                <h2>{formTitle}</h2>
              </div>
              <div className="admin-editor-actions">
                <button className="button outline" type="button" onClick={resetForm}>Limpar <Plus /></button>
                <button className="button primary" type="submit" disabled={saving}>{saving ? "Salvando..." : "Salvar notícia"} <FloppyDisk /></button>
              </div>
            </div>

            <div className="admin-form-grid">
              <label className="full">
                Título
                <input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} required />
              </label>
              <label>
                Categoria
                <select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} required>
                  {newsCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label>
                Data
                <input type="date" value={form.date} onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))} required />
              </label>
              <label className="full">
                Link amigável
                <input value={form.slug} onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))} placeholder="deixe em branco para gerar pelo título" />
              </label>
              <label className="full">
                Resumo
                <textarea rows={4} value={form.summary} onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))} required />
              </label>
              <label className="full">
                Conteúdo
                <textarea rows={12} value={form.content} onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))} placeholder="Separe os parágrafos com uma linha em branco." required />
              </label>
              <label className="full">
                Link oficial da notícia
                <input value={form.officialUrl} onChange={(event) => setForm((current) => ({ ...current, officialUrl: event.target.value }))} placeholder="https://..." />
              </label>
              <label className="full">
                URL da imagem de capa
                <input value={form.coverImageUrl} onChange={(event) => setForm((current) => ({ ...current, coverImageUrl: event.target.value }))} placeholder="https://... ou deixe em branco para enviar arquivo" />
              </label>
              <label className="full">
                Upload da capa
                <input type="file" accept="image/*" onChange={(event) => setForm((current) => ({ ...current, coverFile: event.target.files?.[0] || null }))} />
              </label>
            </div>
          </form>

          <aside className="admin-sidebar">
            <div className="admin-sidebar-card">
              <p className="eyebrow">Publicações cadastradas</p>
              <h2>{loadingItems ? "Carregando..." : `${items.length} notícia(s)`}</h2>
              <p>As notícias salvas aqui entram no site e passam a conviver com o acervo institucional já importado.</p>
            </div>

            <div className="admin-news-list">
              {items.length === 0 && !loadingItems ? (
                <div className="admin-empty-state">
                  <p>Nenhuma notícia cadastrada no painel ainda.</p>
                </div>
              ) : null}

              {items.map((item) => (
                <article className="admin-news-card" key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <small>{item.category} • {item.dateLabel}</small>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                    <div className="admin-card-actions">
                      <button className="button outline" type="button" onClick={() => handleEdit(item)}>Editar <NotePencil /></button>
                      <button className="button danger" type="button" onClick={() => handleDelete(item.id)}>Excluir <Trash /></button>
                    </div>
                    <div className="admin-card-links">
                      <a href={`#noticia/${item.slug}`}>Ver no site</a>
                      {item.officialUrl ? <a href={item.officialUrl} target="_blank" rel="noreferrer">Fonte oficial <ArrowSquareOut /></a> : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

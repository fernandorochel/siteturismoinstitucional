# Turismo Itatinga

Site institucional da Diretoria Municipal de Turismo de Itatinga/SP, com:

- frontend em React + Vite;
- painel administrativo real para notícias;
- banco de dados SQLite persistente;
- login administrativo;
- upload de imagem de capa;
- estrutura pronta para GitHub + Easypanel.

## Como rodar localmente

Recomendado: Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Isso sobe:

- o site em desenvolvimento pelo Vite;
- o servidor do painel e da API na porta `3001`.

## Build

```bash
npm run build
```

O frontend de produção é gerado em:

```bash
dist
```

## Produção

Para iniciar em produção:

```bash
npm run start
```

## Painel administrativo

O painel fica em:

```text
#painel-noticias
```

Exemplo local:

```text
http://localhost:4175/#painel-noticias
```

No primeiro acesso, o sistema abre a criação do administrador inicial.
Nenhuma senha vem gravada no projeto.

## Banco de dados

O sistema usa um banco real em arquivo SQLite, criado automaticamente em:

```text
storage/news-panel.sqlite
```

As imagens enviadas pelo painel ficam em:

```text
storage/uploads
```

Essa pasta está no `.gitignore` e não vai para o GitHub.

## Publicação no Easypanel

Esta é a configuração recomendada:

- Build Command: `npm install && npm run build`
- Start Command: `npm run start`
- Port: `3001`

Também é importante criar um volume persistente apontando para:

```text
/app/storage
```

ou para a pasta `storage` do projeto, conforme o caminho usado no container do Easypanel.

Sem esse volume, as notícias e imagens podem ser perdidas em um novo deploy.

## Estrutura principal

- `src/` → interface do site
- `server/index.js` → API, autenticação e banco
- `public/images/` → imagens públicas do site
- `storage/` → banco e uploads gerados em execução

## Observações

- não há `.env` no repositório;
- não há credenciais fixas no código;
- o painel foi preparado para crescer depois com novos módulos, como atrativos, eventos e apicultores.

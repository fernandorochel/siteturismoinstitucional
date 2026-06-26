# Turismo Itatinga

Site institucional estático da Diretoria Municipal de Turismo de Itatinga/SP.

## Desenvolvimento

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```

Os arquivos finais são gerados na pasta `dist`.

## Publicação no Coolify

1. Envie este projeto para um repositório no GitHub.
2. No Coolify, crie uma aplicação apontando para o repositório.
3. Selecione o build pack **Nixpacks** e ative **Static Site**.
4. Use `npm install` como comando de instalação.
5. Use `npm run build` como comando de build.
6. Defina `dist` como diretório de publicação.
7. Use `/` como Base Directory.

O projeto não usa React Router. A opção SPA pode permanecer ativada para
garantir fallback para `index.html`, mas não é necessária para a navegação
atual, que ocorre por âncoras na mesma página.

O projeto não utiliza banco de dados, autenticação, painel administrativo,
API externa, variáveis de ambiente, senhas, tokens ou credenciais.

O conteúdo está em `src/App.jsx` e as imagens ficam em `public/images`.

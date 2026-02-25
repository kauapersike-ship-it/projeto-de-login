# Projeto de Login

> Projeto simples de login/registro com integração ao Supabase — interface em HTML/CSS/JS.

## Estrutura

- `login.html` — página de login
- `register.html` — página de cadastro
- `plan.html` — escolha de plano
- `script.js` — lógica de frontend (Supabase)
- `plan.js` — scripts da página de planos
- `planstyle.css`, `stylelogin.css` — estilos

## Configuração rápida

1. Instale uma extensão de servidor local (ex.: Live Server) ou inicie um servidor HTTP na pasta do projeto.
2. No Supabase, crie um projeto e configure a tabela `usuarios` (colunas: `email`, `username`, `senha`, opcional `plano`).
3. Atualize `script.js` com a `SUPABASE_URL` e `SUPABASE_KEY` públicas (anon key) para testes locais.
4. Abra `login.html` pelo servidor e teste o fluxo de cadastro/login.

## Execução local (exemplo com `Live Server` no VS Code)

1. Abra a pasta no VS Code.
2. Clique com o botão direito em `login.html` → *Open with Live Server*.

## Observações de segurança

- Nunca inclua chaves secretas no frontend em produção.
- Para produção, mova chamadas sensíveis para um backend seguro.

## Licença

Este repositório está licenciado sob a Licença MIT — veja o arquivo `LICENSE`.

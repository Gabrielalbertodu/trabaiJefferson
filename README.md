# GONME - Aplicativo de Memes

Aplicativo web moderno para compartilhar e descobrir memes, com design inspirado no Elsewhere.

## Características

- **Design Moderno**: Tema escuro com paleta vibrante (Magenta + Cyan + Amarelo)
- **Interface Responsiva**: Funciona perfeitamente em desktop e mobile
- **Feed de Memes**: Navegue por memes da comunidade
- **Sistema de Curtidas**: Interaja com os memes favoritos
- **Comentários**: Comente e discuta sobre os memes
- **Upload Fácil**: Publique seus próprios memes

## Tecnologias

- **Frontend**: React 19 + TypeScript
- **Estilização**: Tailwind CSS 4
- **Componentes UI**: shadcn/ui
- **Roteamento**: Wouter
- **Build**: Vite

## Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Estrutura do Projeto

```
gonme-standalone/
├── client/
│   ├── public/          # Arquivos estáticos
│   ├── src/
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── pages/       # Páginas da aplicação
│   │   ├── hooks/       # React hooks customizados
│   │   ├── lib/         # Utilitários e dados mock
│   │   ├── App.tsx      # Componente principal
│   │   └── main.tsx     # Ponto de entrada
│   └── index.html
├── package.json
├── vite.config.ts
└── README.md
```

## Páginas

- **Home** (`/`): Landing page com apresentação do app
- **Feed** (`/feed`): Feed principal de memes
- **Upload** (`/upload`): Página para publicar novos memes
- **Perfil** (`/perfil`): Perfil do usuário

## Desenvolvimento

Este é um projeto frontend standalone com dados mockados. Para implementar backend real:

1. Adicione um servidor (Express, Fastify, etc.)
2. Configure banco de dados (MySQL, PostgreSQL, MongoDB)
3. Implemente autenticação (JWT, OAuth, etc.)
4. Substitua os dados mock por chamadas API reais

## Licença

MIT

## Autor

Projeto GONME - 2024

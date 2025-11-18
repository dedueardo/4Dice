
# 🏗️ Fase 1: Estruturação Inicial e Arquitetura

## 1.1 Estrutura de Pastas FRONT-END

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── common/         # Botões, inputs, modais, etc
│   │   ├── layout/         # Header, Sidebar, Footer
│   │   ├── character/      # Componentes de ficha
│   │   ├── map/            # Componentes de mapa
│   │   ├── dice/           # Sistema de dados
│   │   └── chat/           # Sistema de chat
│   ├── pages/              # Páginas da aplicação
│   │   ├── Auth/           # Login, Register, ForgotPassword
│   │   ├── Dashboard/      # Dashboard do usuário
│   │   ├── Table/          # Mesa de jogo
│   │   ├── Character/      # Gerenciamento de fichas
│   │   └── Profile/        # Perfil do usuário
│   ├── features/           # Funcionalidades por módulo
│   │   ├── auth/
│   │   ├── tables/
│   │   ├── characters/
│   │   ├── maps/
│   │   └── sessions/
│   ├── hooks/              # Custom hooks
│   ├── services/           # Serviços de API
│   ├── utils/              # Funções utilitárias
│   ├── types/              # TypeScript types/interfaces
│   ├── contexts/           # Context API
│   ├── routes/             # Configuração de rotas
│   ├── assets/             # Imagens, ícones, etc
│   └── styles/             # Estilos globais
```

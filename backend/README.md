# 4Dice Backend (NestJS)

API backend do projeto 4Dice, construído com **NestJS**, **TypeORM** e **PostgreSQL**.
Este sistema gerencia autenticação, usuários, mesas de RPG e persistência de dados.

## 🚀 Funcionalidades Implementadas

- **Autenticação Completa:**
  - Login (JWT Access Token).
  - Registro de usuário com validação.
  - Hash de senha seguro (Argon2/Bcrypt).
- **Gerenciamento de Usuários:**
  - Upload de Avatar (Armazenamento local em `/uploads`).
  - Perfil de usuário.
- **Sistema de E-mail:**
  - Integração com Nodemailer.
  - Suporte a Gmail (Produção) e Ethereal (Desenvolvimento).
  - Envio de e-mail de boas-vindas.
- **API Rest:**
  - Prefixo global `/api`.
  - Interceptores de resposta padrão (`{ data: ... }`).
  - Tratamento de erros global.
  - CORS habilitado para o Frontend (Vite).

## 🛠️ Requisitos

- Node.js 18+ e npm
- PostgreSQL 15+
- Windows PowerShell 5.1 (padrão deste workspace)

## ⚙️ Configuração do Ambiente

1. Instale as dependências:

```
npm install
```

2. Configure variáveis de ambiente em um arquivo `.env` na pasta `backend`:

```ini
# Porta do servidor Nest
PORT=3000

# Database (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=4dice
```

O projeto usa `@nestjs/config` com `ConfigModule.forRoot({ isGlobal: true })` para carregar variáveis de ambiente automaticamente. O `TypeOrmModule.forRootAsync` lê os valores `DB_*` para conectar no PostgreSQL. Ajuste conforme seu ambiente.

3. Crie o banco de dados (se ainda não existir):

```powershell
# Exemplo usando psql (ajuste usuário/senha conforme necessário)
psql -h localhost -U postgres -c "CREATE DATABASE \"4dice\";"
```

Se não tiver `psql`, crie via ferramenta gráfica (pgAdmin) ou outro cliente.

### 🐳 Opção: Banco de Dados via Docker

Se preferir não instalar o PostgreSQL localmente, você pode rodar um container Docker:

```powershell
# Cria e inicia o container do PostgreSQL 15
docker run --name postgres15 -e POSTGRES_PASSWORD=SUA_SENHA -p 5432:5432 -v dados-postgres:/var/lib/postgresql/data -d postgres
```

Depois de rodar o container, conecte-se a ele para criar o banco `4dice` (se o TypeORM não criar automaticamente):

```powershell
docker exec -it postgres15 psql -U postgres -c "CREATE DATABASE \"4dice\";"
```

## Scripts Principais
- `npm run start:dev`: inicia o servidor em modo desenvolvimento com watch.
- `npm run start`: inicia sem watch.
- `npm run start:prod`: roda o build gerado em `dist`.
- `npm run build`: compila TypeScript para `dist`.
- `npm run test`: executa testes unitários (Jest).
- `npm run test:watch`: executa testes em watch.
- `npm run test:cov`: cobertura de testes.
- `npm run lint`: lint com ESLint.
- `npm run format`: formata com Prettier.

O servidor inicia em `http://localhost:3000` (ou na porta definida em `PORT`).


## Testes
```powershell
npm run test
npm run test:watch
npm run test:cov
```

## Estrutura
- `src/main.ts`: bootstrap do Nest e leitura de `PORT`.
- `src/app.module.ts`: configuração global de `ConfigModule` e `TypeORM` (PostgreSQL).
- `src/users/*`: exemplo de módulo de usuários (controllers, services, DTOs e entidades).

Entidades são carregadas via glob `**/*.entity{.ts,.js}`. Com `synchronize: true`, o TypeORM criará/alterará tabelas automaticamente em desenvolvimento. Para produção, recomenda-se desativar e usar migrações.

## Dicas de Troubleshooting
- Erro de conexão: verifique `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME` e se o PostgreSQL está rodando.
- Porta ocupada: altere `PORT` no `.env`.
- Variáveis não carregadas: confirme que o arquivo `.env` está na pasta `backend` e sem espaços extras no nome.


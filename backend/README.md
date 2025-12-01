# 4Dice Backend (NestJS)

API backend do projeto 4Dice, construído com NestJS, TypeORM e PostgreSQL. Este guia cobre configuração de ambiente, comandos para desenvolvimento, testes e build em Windows (PowerShell).

## Requisitos
- Node.js 18+ e npm
- PostgreSQL 13+
- Windows PowerShell 5.1 (padrão deste workspace)

## Configuração do Ambiente
1. Instale dependências:

```powershell
cd "C:\Users\Daniel\Documents\GitHub\4dice\4Dice\backend"
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

## Executar em Desenvolvimento
```powershell
cd "C:\Users\Daniel\Documents\GitHub\4dice\4Dice\backend"
npm run start:dev
```

O servidor inicia em `http://localhost:3000` (ou na porta definida em `PORT`).

## Build e Produção
```powershell
cd "C:\Users\Daniel\Documents\GitHub\4dice\4Dice\backend"
npm run build
npm run start:prod
```

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

## Próximos Passos
- Adicionar migrações do TypeORM para produção.
- Configurar validação global usando `class-validator`/`class-transformer`.
- Habilitar CORS conforme necessário para o frontend.

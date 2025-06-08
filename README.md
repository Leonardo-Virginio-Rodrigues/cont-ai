# 💸 CountAi

Este projeto é composto por uma API desenvolvida com **NestJS + TypeScript** e um front-end com **React + Next.js + TypeScript**. Toda a aplicação roda com suporte a **Docker** e usa **PostgreSQL** como banco de dados.

---

## 📦 Tecnologias utilizadas

- **Backend**: NestJS + TypeScript
  - Validações com `class-validator`
  - Rota principal: `/transaction` com métodos `GET` e `POST`
- **Frontend**: Next.js + React + TypeScript
  - Páginas: `CreateTransaction` e `FindTransactions`
  - Componente global: `Header`
  - Comunicação via `axios` abstraído em `services/`
- **Banco de Dados**: PostgreSQL
- **Ambiente**: Docker + Docker Compose

---

## 🔧 Estrutura do Projeto

```
├── backend/ # API NestJS
├── frontend/ # Aplicação React/Next.js
├── docker-compose.yml # Orquestração com Docker
├── .env # Variáveis de ambiente (não versionado)
└── .gitignore
```

---

## 🧠 Funcionalidades

### 🔙 Backend (NestJS)

A API possui uma rota principal:

#### POST `/transaction`

Cria um novo lançamento no banco.

- **Campos esperados:**

  - `descricao`: `string`
  - `valor`: `number`
  - `tipo`: `string` (ex: Credit ou Debit)
  - `data`: `string` (ISO date)

- A requisição passa pela validação de uma DTO com `class-validator`.

#### GET `/transaction`

Retorna todos os lançamentos existentes, ordenados.

---

### 🎨 Frontend (React + Next.js)

- Usa um componente global `Header` para navegação.
- Organizado em duas páginas principais:

  - **`/CreateTransaction`**:

    - Permite cadastrar lançamentos.
    - Envia os dados para a API via `axios`.

  - **`/FindTransactions`**:
    - Busca todos os lançamentos.
    - Utiliza `useEffect` para carregar os dados ao abrir a página.

- As chamadas HTTP estão organizadas na pasta `services/`, separando a lógica de comunicação com a API.

---

## 🚀 Como executar

### Pré-requisitos

- Docker e Docker Compose instalados

### Passo a passo

1. Clone o repositório:

```bash
git clone https://github.com/Leonardo-Virginio-Rodrigues/cont-ai
```

2. Crie um arquivo .env na raiz com base no exemplo:

```
# -------------------------
# PostgreSQL (usado pelo container 'db')
# -------------------------
POSTGRES_USER=suricato
POSTGRES_PASSWORD=suricato
POSTGRES_DB=contAi

# -------------------------
# Backend NestJS (TypeORM)
# -------------------------
DB_HOST=db                 # Nome do serviço no Docker Compose
DB_PORT=5432
DB_USERNAME=suricato
DB_PASSWORD=suricato
DB_NAME=contAi

# Porta que o NestJS escuta
BACKEND_PORT=4000

# -------------------------
# Frontend Next.js
# -------------------------
# A URL da API exposta para o frontend (acesso via serviço Docker "app")
NEXT_PUBLIC_BACKEND_API_URL=http://app:4000
```

3. Suba os containers com Docker Compose:

```bash
docker-compose up --build
```

4. Acesse:

- Frontend: http://localhost:3000

- Backend: http://localhost:4000

- Banco: PostgreSQL rodando na porta 5432

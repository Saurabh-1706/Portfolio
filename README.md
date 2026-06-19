# AI Portfolio + Headless CMS Monorepo

Welcome to the **AI Portfolio & CMS** monorepo—a production-grade developer portfolio and AI playground built with a headless CMS architecture.

This project is structured as a monorepo containing a modern Next.js frontend and a high-performance FastAPI backend.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, Recharts |
| **Backend** | FastAPI, Pydantic v2, SQLAlchemy 2.0 (Async), Alembic |
| **Database & Cache** | PostgreSQL 16, Redis 7, ChromaDB |
| **Authentication** | Clerk Auth |

---

## 📁 Repository Structure

```
portfolio/
├── frontend/     # Next.js Application (UI & Admin CMS Panels)
├── backend/      # FastAPI Server (REST API, Database Models & Core Logic)
├── docker-compose.yml  # Local services (PostgreSQL, Redis, ChromaDB)
└── README.md     # Root documentation
```

---

## 🚀 Getting Started Locally

### 1. Start Database & Services
Make sure **Docker Desktop** is running, then start the containers:
```bash
docker compose up -d
```

### 2. Set Up the Backend
1. Initialize the virtual environment and install dependencies:
   ```bash
   cd backend
   python -m venv .venv
   .venv\Scripts\pip install -r requirements.txt
   ```
2. Run database migrations:
   ```bash
   .venv\Scripts\alembic revision --autogenerate -m "init tables"
   .venv\Scripts\alembic upgrade head
   ```
3. Start the API server:
   ```bash
   .venv\Scripts\uvicorn app.main:app --reload
   ```

### 3. Set Up the Frontend
1. Start the development server (make sure you've configured your `.env.local` keys via `clerk env pull` first):
   ```bash
   cd frontend
   npm run dev
   ```

---

## 🔒 Authentication & CMS
The Admin CMS dashboard is served at `/admin/dashboard` on the frontend, protected by **Clerk**. Once authenticated, you can perform full CRUD operations on projects, blogs, and skills, updating the live site instantly.

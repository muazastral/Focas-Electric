<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Focas Electric (React + Laravel + SQLite)

Frontend is Vite + React. Backend API is Laravel (in [backend/README.md](backend/README.md)) using SQLite.

## Frontend Setup

1. Install dependencies:
   `npm install`
2. Copy [.env.example](.env.example) to `.env` and keep:
   `VITE_API_BASE_URL=http://127.0.0.1:8000/api`
3. Start frontend:
   `npm run dev`

### Run both frontend + backend together

- Frontend only: `npm run dev:frontend`
- Backend only: `npm run dev:backend`
- Both together: `npm run dev:all`

Notes:
- Run scripts with `npm run ...` (for example, `dev:all` alone will not work).
- In WSL, backend script automatically falls back to XAMPP PHP at `/mnt/c/xampp/php/php.exe` if `php` is not in PATH.
- `backend/` must be a full Laravel app (must include `backend/artisan`).

## Backend Setup

Follow [backend/README.md](backend/README.md).

## Demo Login

- Admin: `admin@focus.com` / `password`
- User: `user@gmail.com` / `password`

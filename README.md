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
- Backend only (strict/fail-fast): `npm run dev:backend:strict`
- Both together: `npm run dev:all`

Notes:
- Run scripts with `npm run ...` (for example, `dev:all` alone will not work).
- Backend startup uses a cross-platform Node launcher and tries `php` in PATH, then common XAMPP locations.
- If PHP is not available, `dev:all` keeps frontend running and prints a backend warning instead of crashing.
- In WSL with interop disabled, Windows `php.exe` cannot be executed; install Linux PHP (`php-cli`, `php-sqlite3`) or run from PowerShell.
- Use `dev:backend:strict` when you want a non-zero exit code if backend cannot start.
- Set `BACKEND_STRICT=1` to make `dev:backend` (and therefore `dev:all`) fail fast in CI.
- `backend/` must be a full Laravel app (must include `backend/artisan`).

## Backend Setup

Follow [backend/README.md](backend/README.md).

### CMS Setup (Media + Page Builder)

After backend dependencies are ready:

- Run migrations: `cd backend && php artisan migrate`
- Create media storage symlink: `cd backend && php artisan storage:link`

What is included now:
- Media Library API with upload/delete (stored in Laravel `public` disk).
- CMS Page API for page title/slug/status and section JSON blocks.
- Product `inventoryMatrix` support for stock by `variant`, `color`, `size`, `length`, `weight`, and custom detail.

### CMS Features Enabled

- Media Library API with persistent storage (`/api/admin/media`)
- CMS Page Builder API (`/api/admin/pages`) with JSON section blocks
- Product Inventory Matrix (`inventoryMatrix`) for stock per variant/color/size/length/weight

After pulling latest changes, run:

`cd backend && php artisan migrate && php artisan storage:link`

## Demo Login

- Admin: `admin@focus.com` / `password`
- User: `user@gmail.com` / `password`

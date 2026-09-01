# Kulla Media

News, TV &amp; Radio media site. Split into two deployable services:

- `frontend/` — React + Vite single-page app
- `backend/` — Node/Express API serving headlines, news, schedule, on-air, and newsletter endpoints

## Local development

```bash
cd backend && npm install && npm run dev   # http://localhost:4000
cd frontend && npm install && npm run dev  # http://localhost:5173
```

Set `VITE_API_URL` in `frontend/.env` to point at the backend.

## Deployment

Both services deploy independently to Railway from this repo (root directories `backend/` and `frontend/`).

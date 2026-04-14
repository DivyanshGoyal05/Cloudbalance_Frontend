# CloudBalance Frontend

React + Vite frontend for the CloudBalance dashboard.

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

## Environment

Set `VITE_API_BASE_URL` if the backend is not running at `http://localhost:8080`.

Example:

```powershell
$env:VITE_API_BASE_URL="http://localhost:8080"
npm run dev
```

## Notes

- API calls are centralized in `src/api/axiosConfig.jsx`.
- Dashboard routes live under `/dashboard`.
- User management depends on backend `/users` and `/cloudAccount` endpoints.

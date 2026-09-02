# Student Portal

Monorepo for the Student Portal project. Merged from three separate repositories
with full commit history and author attribution preserved.

## Structure

| Path       | What it is             | Stack                        | Dev port |
|------------|------------------------|------------------------------|----------|
| `student/` | Student-facing frontend | React 18 + Vite + TypeScript | 5173     |
| `admin/`   | Admin frontend          | React 18 + Vite + TypeScript | 5173     |
| `backend/` | REST API               | Express + Neon Postgres      | 5000     |

Each folder is a self-contained npm package with its own `package.json` and
lockfile. There is no root workspace yet — install and run each separately.

## Running

```bash
# API — start this first, the frontends proxy /api to it
cd backend && npm install && npm run dev

# Student frontend
cd student && npm install && npm run dev

# Admin frontend
cd admin && npm install && npm run dev
```

`backend/` needs a `.env`; see `backend/.env.sample` for the required keys
(`PORT`, `PG_URI`, `JWT_SECRET`).

## Known issues

These predate the merge and are not yet fixed:

- **Admin proxy points at the wrong port.** `admin/vite.config.ts` proxies `/api`
  to `:7000`, but the backend runs on `:5000`. Admin API calls fail until this
  is aligned.
- **Both frontends default to Vite port 5173** and collide if run at the same
  time. Pass `--port` to one of them.
- **Backend routers are not mounted.** `backend/server.js` requires
  `routes/register.route.js` and `routes/login.route.js` but never calls
  `app.use()` on them. The live endpoints are inline mocks that skip the
  database entirely. The route files also omit `module.exports`.
- **Login payload mismatch.** The backend expects `{ usn, password }`;
  `admin/src/app/(auth)/login.tsx` sends `{ email, password }`.

## History

Merged via `git subtree add` (not squashed), so `git log` reaches every original
commit with its original SHA and author. `.mailmap` consolidates author
identities for display only — no commits were rewritten.

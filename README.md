# Student Portal

Monorepo for the Student Portal project. Merged from three separate repositories
with full commit history and author attribution preserved.

## Structure

| Path       | What it is             | Stack                        | Dev port |
|------------|------------------------|------------------------------|----------|
| `student/` | Student-facing frontend | React 18 + Vite + TypeScript | 5173     |
| `admin/`   | Admin frontend          | React 18 + Vite + TypeScript | 5174     |
| `backend/` | REST API (**submodule**) | Express + Neon Postgres     | 5000     |

`student/` and `admin/` live directly in this repo. **`backend/` is a git
submodule** pointing at the upstream
[Ashwinigadad/Student_Portal_Backend](https://github.com/Ashwinigadad/Student_Portal_Backend),
pinned at `d8e62b6`.

> **The submodule is read-only for this project.** The pointer targets a
> repository we do not own, so backend changes cannot be pushed from here.
> They have to go through a PR to that repo, or through the fork at
> [BNsrujan/Student_Portal_Backend](https://github.com/BNsrujan/Student_Portal_Backend).

Each folder is a self-contained npm package with its own `package.json` and
lockfile. There is no root workspace yet — install and run each separately.

## Cloning

The submodule means a plain `git clone` leaves `backend/` **empty**:

```bash
git clone --recurse-submodules https://github.com/BNsrujan/Student_portal.git

# already cloned without it?
git submodule update --init --recursive
```

## Working with the backend submodule

`backend/` tracks a specific commit of a repository this project does not own,
so there is no direct push path. To change backend code, work in the fork and
open a PR upstream:

```bash
git clone https://github.com/BNsrujan/Student_Portal_Backend.git
# ...edit, commit, push, then open a PR to Ashwinigadad/Student_Portal_Backend
```

Once a PR merges upstream, advance the pointer here:

```bash
git submodule update --remote backend
git add backend
git commit -m "chore: bump backend submodule"
```

A fixed branch already exists at `0fb8d77` on the fork (working pg Pool, routers
mounted, CommonJS errors resolved). It is **not** pinned here — see Known issues.

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

- **The pinned backend serves no API at all.** At `d8e62b6` every
  `app.use("/api/...")` line in `server.js` is commented out, so the server
  starts and 404s every request. On top of that: `db/db.js` exports nothing
  (every `pool.query()` throws `TypeError`), `healthcheck.controller.js` and
  `auth.middleware.js` use ESM `export` in a CommonJS package (SyntaxError on
  require), all three route files omit `module.exports`, and
  `login.route.js` registers its handler at `/register`.
- **CORS and ports are misconfigured at the pin.** `server.js` allows origin
  `http://localhost:3000`, but the frontends run on 5173 and 5174; its port
  fallback is 7000 while both Vite proxies target 5000. `express.urlencoded`
  and `cookieParser` are commented out.
- Fixes for all of the above exist at `0fb8d77` on
  [the fork](https://github.com/BNsrujan/Student_Portal_Backend) and need a PR
  upstream before they can be pinned here.
- **`.env` is tracked at the pinned commit** and contains a live Neon
  connection string. Rotate that credential.
- **No database schema exists anywhere in the repo.** There is no `.sql` file or
  migration, and nothing creates the `users` table the controllers query. The
  backend cannot work until someone defines it.
- **Login identity is inconsistent.** `backend/controllers/login.controller.js`
  keys on `email`, but `student/`'s login sends `usn`. One of the two has to move.
- **Register drops fields.** The student signup form posts `semester`, `branch`,
  `usn` and `section`, but the register controller only inserts `username`,
  `email` and `password`.
- **Auth middleware is a stub.** `backend/middlewares/auth.middleware.js` returns
  501 and is not mounted; `backend/middlewares/auth.js` and
  `backend/models/user.model.js` are empty files.

## History

Merged via `git subtree add` (not squashed), so `git log` reaches every original
commit with its original SHA and author. `.mailmap` consolidates author
identities for display only — no commits were rewritten.

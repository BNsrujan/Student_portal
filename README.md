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
submodule** pointing at [BNsrujan/Student_Portal_Backend](https://github.com/BNsrujan/Student_Portal_Backend),
which is a fork of the upstream backend — that keeps the fork relationship and
its PR flow intact.

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

`backend/` tracks a specific commit, not a branch. Commits made inside it belong
to the backend repo and must be pushed there, then the pointer bumped here:

```bash
cd backend
git checkout main            # submodules land detached by default
# ...edit, commit...
git push origin main

cd ..
git add backend              # records the new pointer
git commit -m "chore: bump backend submodule"
```

To pull upstream changes into the pointer: `git submodule update --remote backend`

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
- **The backend fixes are untested against a live database**, since no schema
  exists to test against.

## History

Merged via `git subtree add` (not squashed), so `git log` reaches every original
commit with its original SHA and author. `.mailmap` consolidates author
identities for display only — no commits were rewritten.

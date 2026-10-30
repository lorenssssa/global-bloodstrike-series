# Global Blood Strike Series — Web Platform

Official bilingual website and tournament management platform for Global Blood Strike Series (GBS).

## Current project contents
- Public bilingual website (Spanish / English)
- Public team registration form
- Admin interface for team moderation, tournaments and match results
- Node.js + Express API
- Official GBS scoring defaults
- Audit log for result changes

## Official GBS scoring
| Placement | Placement points | Kill points |
|---|---:|---:|
| 1 | 25 | +1 per kill |
| 2 | 23 | +1 per kill |
| 3 | 20 | +1 per kill |
| 4 | 18 | +1 per kill |
| 5 | 16 | +1 per kill |
| 6 | 14 | +1 per kill |
| 7–12 | 0 | 0 |

For placements 1–6, total = placement points + kills. Placements 7–12 receive zero total points, including kill points.

## Local development (current SQLite MVP)
1. Install Node.js 20 or newer.
2. `cd server`
3. `npm install`
4. Copy `.env.example` to `.env` and set a strong `ADMIN_PASSWORD`.
5. `npm start`
6. Open `http://localhost:3000` and `http://localhost:3000/admin.html`.

## Deployment status
This repository is a staging snapshot, not production-ready. The current backend uses SQLite and in-memory admin sessions. Before public deployment:
- Migrate persistence to PostgreSQL (recommended for a free hosting setup).
- Replace the basic in-memory authentication with secure, persistent sessions and hardened password handling.
- Add rate limiting, request validation, security headers, and appropriate CORS/CSRF protections.
- Configure database backups and test restore procedures.
- Test public registrations, moderation, scoring, corrections, and audit history end-to-end.

Do not deploy this snapshot with real tournament data or a real administrator password until the hardening and database migration are complete.

## Hosting target
Planned: Render web service + Supabase PostgreSQL. Hosting configuration and environment variables will be documented after the PostgreSQL migration is implemented and tested.

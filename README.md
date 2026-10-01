# COGNEXA
AI-Powered Placement Preparation & Assessment Platform

A ready-to-run full-stack starter covering:
- Student/Admin demo login
- Student dashboard
- Aptitude practice
- Timed aptitude assessment
- AI GD room with demo AI personas
- GD performance report
- Performance dashboard
- Admin/Placement dashboard
- Express + TypeScript API
- PostgreSQL + Prisma schema
- Optional Groq integration
- Socket.IO-ready backend

## Requirements
- Node.js 20+
- npm
- PostgreSQL (only required for the database layer)
- Groq API key (optional; demo AI responses work without it)

## Run the frontend
```bash
cd client
npm install
npm run dev
```
Open http://localhost:5173

## Run the backend
In another terminal:
```bash
cd server
npm install
copy .env.example .env
npm run dev
```
On macOS/Linux use `cp .env.example .env`.

The API runs on http://localhost:5000.

## Optional database setup
Create a PostgreSQL database, then set DATABASE_URL in `server/.env`.

```bash
cd server
npx prisma generate
npx prisma migrate dev --name init
```

## Optional Groq setup
Add your key to `server/.env`:
```env
GROQ_API_KEY=your_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```
Without a key, the GD uses safe demo responses so the app still runs.

## Demo credentials
The prototype login accepts:
Student:
- Email: student@cognexa.com
- Password: student123

Admin:
- Email: admin@cognexa.com
- Password: admin123

The prototype authentication is intentionally simple. Before production deployment, replace it with hashed-password authentication and secure sessions/JWT.

## Project structure
```
COGNEXA/
  client/       React + TypeScript + Tailwind frontend
  server/       Express + TypeScript backend
  docs/         project notes
```

## Important
This package is a functional starter/prototype, not a finished production SaaS. It is designed so your team can progressively connect real PostgreSQL persistence, Groq evaluation, Socket.IO rooms, and WebRTC.

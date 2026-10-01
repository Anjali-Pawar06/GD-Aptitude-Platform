# COGNEXA Project Scope

## MVP
1. Student/Admin login
2. Aptitude practice
3. Timed aptitude assessment
4. Automatic scoring
5. AI GD with 2–3 personas
6. Text interaction
7. Voice UI hook (Web Speech API can be connected)
8. GD evaluation and report
9. Performance tracking
10. Admin dashboard
11. PostgreSQL/Prisma data model
12. Socket.IO-ready live GD
13. WebRTC-ready live GD UI

## Data structures used in the application
- Arrays/lists: questions, options, messages, participants
- Hash maps/objects: answer selections and session state
- Queue-like turn order: AI GD participant response cycle
- Database indexes/relations: persistent assessment and GD records
- Sorting/filtering: admin performance views

## Next production steps
- Replace demo authentication with secure hashed credentials/JWT or secure sessions.
- Persist all attempts and GD sessions through Prisma.
- Connect frontend GD requests to `/api/gd/respond`.
- Connect final transcript to `/api/gd/evaluate`.
- Implement Socket.IO client room logic.
- Add WebRTC signaling and peer connections.
- Add real question management and admin CRUD.
- Add secure environment variables in deployment.

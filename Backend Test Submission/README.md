# Server (URL Shortener)

## Setup
1. `cd server`
2. copy `.env.example` to `.env` and set `MONGODB_URI` if needed.
3. `npm install`
4. `npm run dev` (requires nodemon) or `npm start`

## API Endpoints
- POST /api/shorten  { url: "https://..." }  => { shortUrl, shortId }
- GET  /s/:shortId   => redirects to original URL
- GET  /api/stats/:shortId => { shortId, originalUrl, clicks, createdAt }

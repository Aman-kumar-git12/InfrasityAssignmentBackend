<div align="center">

# Notes · Backend

**REST API for a full-stack note-taking app with secure, private notes for every user.**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-9-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)

**[Live app](https://infrasity-assignment-dev.vercel.app)** · **[Frontend repo](https://github.com/Aman-kumar-git12/InfrasityAssignmentDev)** · **[Backend repo](https://github.com/Aman-kumar-git12/InfrasityAssignmentBackend)**

[Features](#features) · [How it works](#how-it-works) · [Getting started](#getting-started) · [API](#api) · [Deployment](#deployment) · [Structure](#project-structure)

</div>

---

## Repositories

| Part | Repository | Hosted on |
| --- | --- | --- |
| **Frontend** (React + Vite) | [Aman-kumar-git12/InfrasityAssignmentDev](https://github.com/Aman-kumar-git12/InfrasityAssignmentDev) | [Vercel](https://infrasity-assignment-dev.vercel.app) |
| **Backend** (Express + MongoDB) · *you are here* | [Aman-kumar-git12/InfrasityAssignmentBackend](https://github.com/Aman-kumar-git12/InfrasityAssignmentBackend) | [Render](https://infrasityassignmentbackend.onrender.com/api/health) |

## Features

- **Auth:** sign up, log in and log out with a JWT stored in an **httpOnly cookie**; passwords hashed with bcrypt
- **Notes:** create, list, read, update and delete
- **Privacy:** users only ever see their own notes; anyone else's note returns `404`
- **Validation:** request bodies and note ids are checked before they reach the database
- **Consistent responses:** every endpoint returns `{ success, message, data }`, and every error goes through one handler

## How it works

```mermaid
flowchart LR
    FE["Frontend<br/>(sends cookie)"] -->|HTTP| R["Routes"]
    R --> MW["Middlewares<br/>protect · validate · id check"]
    MW --> C["Controllers"]
    C --> S["Services"]
    S --> DB[("MongoDB")]
    MW -. error .-> EH["Error handler"]
    C -. error .-> EH
    S -. error .-> EH
    EH -->|"{ success: false, message }"| FE
```

| Layer | Job |
| --- | --- |
| **Routes** | Connect each URL to its middlewares and controller |
| **Middlewares** | `protect` checks the JWT cookie, validators check the body, `validateObjectId` checks `:id` |
| **Controllers** | Read the request, call a service, send `{ success, message, data }` |
| **Services** | One function per file, holding the database logic |
| **Error handler** | Turns any thrown error into `{ success: false, message }` with the right status code |

Express 5 forwards errors from async handlers automatically, so controllers and services simply `throw httpError(404, "Note not found")` with no `try/catch` boilerplate.

**Ownership.** Every note query filters on both the note id and the logged-in user's id, so another user's note simply isn't found:

```js
Note.findOne({ _id: noteId, user: req.user.id });
```

## Getting started

**Prerequisites:** Node.js 20.19+ and a MongoDB database ([Atlas](https://www.mongodb.com/atlas) free tier works).

```bash
git clone https://github.com/Aman-kumar-git12/InfrasityAssignmentBackend.git
cd InfrasityAssignmentBackend
npm install
cp .env.example .env      # add your MONGO_URI and JWT_SECRET
npm run dev               # http://localhost:5001
```

Check it's running: [http://localhost:5001/api/health](http://localhost:5001/api/health)

To use the UI, run the [frontend](https://github.com/Aman-kumar-git12/InfrasityAssignmentDev#getting-started) alongside it.

### Environment variables

| Variable | Example | Notes |
| --- | --- | --- |
| `PORT` | `5001` | |
| `NODE_ENV` | `development` | Use `production` when deployed, so the auth cookie works cross-site |
| `MONGO_URI` | `mongodb+srv://user:pass@cluster/notes` | |
| `JWT_SECRET` | any long random string | |
| `JWT_EXPIRES_IN` | `7d` | |
| `CLIENT_URL` | `http://localhost:5173` | Frontend origin allowed by CORS, with no trailing slash |

Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## API

Base URL: `http://localhost:5001/api` locally, `https://infrasityassignmentbackend.onrender.com/api` in production. 🔒 = requires the auth cookie.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/health` | Health check |
| `POST` | `/auth/signup` | Create account and set cookie `{ name, email, password }` |
| `POST` | `/auth/login` | Log in and set cookie `{ email, password }` |
| `GET` | `/auth/me` 🔒 | Current user |
| `POST` | `/auth/logout` 🔒 | Clear cookie |
| `GET` | `/notes` 🔒 | List your notes, newest first |
| `POST` | `/notes` 🔒 | Create a note `{ title, content }` |
| `GET` | `/notes/:id` 🔒 | Get a note |
| `PUT` | `/notes/:id` 🔒 | Update a note `{ title?, content? }` |
| `DELETE` | `/notes/:id` 🔒 | Delete a note |

Every response has the same shape:

```jsonc
// success
{ "success": true, "message": "Note created successfully", "data": { "note": {} } }

// error
{ "success": false, "message": "Note not found" }
```

<details>
<summary><b>Error responses</b></summary>

| Status | When |
| --- | --- |
| `400` | Invalid JSON, failed validation, invalid note id |
| `401` | No cookie, invalid or expired token, wrong email or password |
| `404` | Note not found (or not yours), unknown route |
| `409` | Email already registered |
| `500` | Unexpected server error (message hidden in production) |

</details>

## Deployment

Deployed on **Render** as a Node web service:

| Setting | Value |
| --- | --- |
| Build command | `npm install` |
| Start command | `npm start` |
| `NODE_ENV` | `production` |
| `CLIENT_URL` | `https://infrasity-assignment-dev.vercel.app` |

Plus `MONGO_URI`, `JWT_SECRET` and `JWT_EXPIRES_IN`. In MongoDB Atlas, allow Render under *Network Access* (`0.0.0.0/0`).

The frontend (Vercel) and backend (Render) are on different domains, so in production the cookie is sent as `Secure; SameSite=None`. That's why `NODE_ENV=production` is required.

## Project structure

```
src
├── config/         db.js
├── controllers/    auth, note
├── middlewares/    auth (protect), validate, validateObjectId, notFound, error
├── models/         User, Note
├── routes/         auth, note
├── services/       auth/*  notes/*   (one function per file)
├── utils/          sendResponse, httpError, generateToken, cookieOptions
├── validators/     auth, note
└── app.js          Express setup, routes, DB connection, server start
```

## Troubleshooting

- **CORS error:** `CLIENT_URL` must exactly match the frontend origin, with no trailing slash.
- **Logged out right after logging in (production):** check that `NODE_ENV=production` is set on Render.
- **Port 5000 busy on macOS:** AirPlay Receiver uses it, so this project uses **5001**.
- **MongoDB won't connect:** check `MONGO_URI`, and in Atlas add your IP under *Network Access*.
- **First request is slow:** Render's free tier sleeps when idle, and the first request wakes it (~30–60 s).

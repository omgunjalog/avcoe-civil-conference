# CIVICON 2026

Production-ready conference website for the Civil Department of Amrutvahini College of Engineering.

## Stack

- Client: Vite, React, Tailwind CSS v4, Framer Motion, React Router, Axios, React Hot Toast
- Server: Node.js, Express, MongoDB, Mongoose, Multer, JWT, Nodemailer
- Hosting target: Vercel + Render + MongoDB Atlas

## Project Structure

```text
avcoe-civil-conference/
  client/
    src/
      components/
      data/
      layouts/
      pages/
      services/
    vercel.json
  server/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    uploads/
  render.yaml
```

## Local Setup

1. Start MongoDB locally or replace `MONGODB_URI` in [server/.env](./server/.env).
2. Review admin credentials in [server/.env](./server/.env).
3. Choose an email mode in [server/.env](./server/.env):
   - `EMAIL_DELIVERY_MODE=preview` to save generated emails locally for testing
   - `EMAIL_DELIVERY_MODE=smtp` with SMTP credentials for real delivery
   - `EMAIL_DELIVERY_MODE=off` to disable notifications entirely
4. Install dependencies:

```bash
cd client
npm install
cd ../server
npm install
```

## Run Commands

Client:

```bash
cd client
npm run dev
```

Server:

```bash
cd server
npm run dev
```

## APIs

- `POST /api/register`
- `GET /api/register` admin only
- `PATCH /api/register/:id` admin only
- `DELETE /api/register/:id` admin only
- `POST /api/submit-paper`
- `POST /api/track-paper`
- `GET /api/papers` admin only
- `PATCH /api/papers/:id` admin only
- `PATCH /api/papers/:id/status` admin only
- `DELETE /api/papers/:id` admin only
- `POST /api/admin/login`
- `GET /api/admin/overview` admin only

## Email Notifications

The backend supports three modes:

- `preview`: writes generated emails into `server/email-outbox/`
- `smtp`: sends real emails using the configured SMTP provider
- `off`: disables email delivery

Notification events:

- registration submission received
- registration payment status changed by admin
- paper submission received with tracking ID
- paper review status changed by admin

You can change providers later by updating only env values. No code changes are required.

## Serious Client Review Deployment

Recommended stack:

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

### 1. Push the repo to GitHub

Before pushing:

- confirm [/.gitignore](/c:/Users/admin/portfolio-website/portfolio/avcoe-civil-conference/.gitignore) is respected
- do not commit `client/.env` or `server/.env`
- rotate any secrets that were ever exposed during testing

### 2. Create MongoDB Atlas

1. Create a free or paid Atlas cluster.
2. Create a database user.
3. Add Render's outbound IP rule if you want stricter access, or temporarily allow `0.0.0.0/0` during setup.
4. Copy the application connection string.

Use that value as:

- `MONGODB_URI`

### 3. Deploy the backend on Render

The repo already includes [render.yaml](/c:/Users/admin/portfolio-website/portfolio/avcoe-civil-conference/render.yaml).

Render service settings:

- Service type: `Web Service`
- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Persistent disk: already defined in `render.yaml`
- Upload persistence path: `/var/data/uploads`

Required backend env vars:

- `MONGODB_URI`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD` or `ADMIN_PASSWORD_HASH`
- `ALLOWED_ORIGINS`
- `CLIENT_URL`
- `EMAIL_DELIVERY_MODE`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_FROM`

Recommended values:

- `UPLOAD_DIR=/var/data/uploads`
- `EMAIL_DELIVERY_MODE=smtp`
- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=587`
- `SMTP_SECURE=false`

Important:

- the persistent disk is necessary because paper PDFs and payment proof uploads are stored on disk
- without the disk, uploaded files would be lost on deploy or restart

### 4. Deploy the frontend on Vercel

Frontend settings:

- Framework preset: `Vite`
- Root directory: `client`

The repo already includes [client/vercel.json](/c:/Users/admin/portfolio-website/portfolio/avcoe-civil-conference/client/vercel.json) so React Router routes resolve correctly after refresh.

Required frontend env vars:

- `VITE_API_BASE_URL=https://your-render-service.onrender.com/api`
- `VITE_SERVER_URL=https://your-render-service.onrender.com`

### 5. Wire frontend and backend together

After Vercel gives you a frontend URL:

1. put that Vercel URL into backend env:
   - `CLIENT_URL`
   - `ALLOWED_ORIGINS`
2. redeploy the Render backend if needed

### 6. Production checks before sharing with the client

Verify:

- home page loads
- route refresh works on inner pages
- registration submission works
- payment proof upload works
- paper upload works
- admin login works
- tracking page works
- email notifications are delivered
- uploaded PDFs and payment proofs remain available after a Render redeploy

## Admin Credentials

- Email: `admin@civicon2026.com`
- Password: `Admin@123`

Change them before production sharing.

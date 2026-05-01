# SRES 2026

Production website for the Civil Department conference at Amrutvahini College of Engineering.

## Current Production Setup

The live public website is now frontend-first:

- Registration uses the client-provided external registration form
- Abstract submission uses the client-provided external submission form
- The public Vercel deployment does not expose the old tracking or admin routes

## Stack

- Client: Vite, React, Tailwind CSS v4, React Router, React Hot Toast
- Hosting target: Vercel
- Legacy backend: Node.js, Express, MongoDB, Mongoose, Multer, JWT, Nodemailer

## Project Structure

```text
avcoe-civil-conference/
  client/
    src/
      components/
      data/
      layouts/
      pages/
    public/
    vercel.json
  server/
  render.yaml
```

## Local Development

Install and run the frontend:

```bash
cd client
npm install
npm run dev
```

Build for production:

```bash
cd client
npm run build
```

## Vercel Deployment

Recommended Vercel settings:

- Framework preset: `Vite`
- Root directory: `client`

The repo includes `client/vercel.json` so React Router routes resolve correctly on refresh.

## Production Checklist

- Verify the home page loads
- Verify inner-page refresh works
- Verify registration buttons open the external registration form
- Verify abstract submission buttons open the external submission form
- Verify desktop and mobile layouts look correct

## Legacy Backend Note

The repository still contains the older backend in `server/` for reference or future reuse, but it is no longer required for the current public site flow.

## Documentation

- [Architecture Overview](./ARCHITECTURE_OVERVIEW.md)
- [Client Tutorial](./CLIENT_TUTORIAL.md)
- [Graphify Report](./graphify-out/GRAPH_REPORT.md)

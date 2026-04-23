# Architecture Overview

This document is a short human-readable map of the `avcoe-civil-conference` project.

It complements the generated Graphify artifacts in:

- [graphify-out/GRAPH_REPORT.md](./graphify-out/GRAPH_REPORT.md)
- [graphify-out/graph.html](./graphify-out/graph.html)
- [graphify-out/graph.json](./graphify-out/graph.json)

## What This Project Is

This repository is a full-stack conference platform for `SRES-26`, built around:

- a public-facing conference website
- registration and payment-proof submission
- paper submission and tracking
- admin review and status management
- transactional email notifications

At a high level, the system is split into:

- `client/` for the React frontend
- `server/` for the Express API and business logic
- `graphify-out/` for generated architecture graph artifacts

## Top-Level Structure

```text
avcoe-civil-conference/
  client/
    src/
      components/
      data/
      layouts/
      pages/
      services/
  server/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    utils/
  graphify-out/
  README.md
  CLIENT_TUTORIAL.md
  render.yaml
```

## Frontend Architecture

The frontend is a React application organized by route pages plus reusable UI components.

### Important frontend entry points

- [client/src/main.jsx](./client/src/main.jsx)
  - bootstraps the React app
- [client/src/App.jsx](./client/src/App.jsx)
  - defines route structure and page-level lazy loading
- [client/src/layouts/SiteLayout.jsx](./client/src/layouts/SiteLayout.jsx)
  - shared shell for public pages

### Shared UI components

- [client/src/components/Navbar.jsx](./client/src/components/Navbar.jsx)
- [client/src/components/Footer.jsx](./client/src/components/Footer.jsx)
- [client/src/components/PageHero.jsx](./client/src/components/PageHero.jsx)
- [client/src/components/SectionFrame.jsx](./client/src/components/SectionFrame.jsx)
- [client/src/components/SectionHeader.jsx](./client/src/components/SectionHeader.jsx)
- [client/src/components/SurfaceCard.jsx](./client/src/components/SurfaceCard.jsx)
- [client/src/components/Skeletons.jsx](./client/src/components/Skeletons.jsx)
- [client/src/components/ScrollToTop.jsx](./client/src/components/ScrollToTop.jsx)

### Frontend data and API

- [client/src/data/conferenceData.js](./client/src/data/conferenceData.js)
  - brochure-driven site content and structured conference data
- [client/src/services/api.js](./client/src/services/api.js)
  - central API wrapper used by forms, admin, and tracking flows

### Most important pages

- [client/src/pages/HomePage.jsx](./client/src/pages/HomePage.jsx)
  - public landing page and main conference messaging
- [client/src/pages/CommitteePage.jsx](./client/src/pages/CommitteePage.jsx)
  - leadership, organizing committee, and advisory committee
- [client/src/pages/RegistrationPage.jsx](./client/src/pages/RegistrationPage.jsx)
  - pricing, payment details, and registration flow
- [client/src/pages/SubmitPaperPage.jsx](./client/src/pages/SubmitPaperPage.jsx)
  - manuscript submission and author-facing guidance
- [client/src/pages/TrackPaperPage.jsx](./client/src/pages/TrackPaperPage.jsx)
  - author tracking interface
- [client/src/pages/AdminDashboardPage.jsx](./client/src/pages/AdminDashboardPage.jsx)
  - admin operations dashboard

## Backend Architecture

The backend is an Express application with controllers for each workflow, plus supporting services for validation, uploads, and notifications.

### Backend entry point

- [server/server.js](./server/server.js)
  - Express bootstrap, middleware registration, route mounting, static file serving

### Routes

The route layer maps API endpoints to controller logic.

- [server/routes/adminRoutes.js](./server/routes/adminRoutes.js)
- [server/routes/paperRoutes.js](./server/routes/paperRoutes.js)
- [server/routes/registrationRoutes.js](./server/routes/registrationRoutes.js)

### Controllers

Controllers handle request/response coordination and delegate deeper logic.

- [server/controllers/adminController.js](./server/controllers/adminController.js)
  - admin login and admin overview
- [server/controllers/paperController.js](./server/controllers/paperController.js)
  - paper creation, tracking, status updates, deletion
- [server/controllers/registrationController.js](./server/controllers/registrationController.js)
  - registration creation, updates, deletion, payment state handling

### Models

- [server/models/Paper.js](./server/models/Paper.js)
- [server/models/Registration.js](./server/models/Registration.js)

These define the MongoDB document shapes used by the application.

### Middleware

- [server/middleware/authMiddleware.js](./server/middleware/authMiddleware.js)
  - admin JWT protection
- [server/middleware/uploadMiddleware.js](./server/middleware/uploadMiddleware.js)
  - file upload config and file filtering
- [server/middleware/errorMiddleware.js](./server/middleware/errorMiddleware.js)
  - not-found and centralized error responses

### Services

The services layer is where the backend becomes most structured.

- [server/services/emailService.js](./server/services/emailService.js)
  - delivery-mode logic and actual outbound email transport
- [server/services/notificationService.js](./server/services/notificationService.js)
  - notification orchestration and email content generation

### Validation and helpers

- [server/utils/validators.js](./server/utils/validators.js)
  - input normalization and payload validation

## Most Important Workflow Paths

These are the most important cross-file flows in the project.

### 1. Registration flow

Frontend:

- [client/src/pages/RegistrationPage.jsx](./client/src/pages/RegistrationPage.jsx)
- [client/src/components/RegistrationForm.jsx](./client/src/components/RegistrationForm.jsx)
- [client/src/services/api.js](./client/src/services/api.js)

Backend:

- [server/routes/registrationRoutes.js](./server/routes/registrationRoutes.js)
- [server/controllers/registrationController.js](./server/controllers/registrationController.js)
- [server/utils/validators.js](./server/utils/validators.js)
- [server/services/notificationService.js](./server/services/notificationService.js)
- [server/services/emailService.js](./server/services/emailService.js)

### 2. Paper submission and tracking flow

Frontend:

- [client/src/pages/SubmitPaperPage.jsx](./client/src/pages/SubmitPaperPage.jsx)
- [client/src/components/PaperSubmissionForm.jsx](./client/src/components/PaperSubmissionForm.jsx)
- [client/src/pages/TrackPaperPage.jsx](./client/src/pages/TrackPaperPage.jsx)
- [client/src/services/api.js](./client/src/services/api.js)

Backend:

- [server/routes/paperRoutes.js](./server/routes/paperRoutes.js)
- [server/controllers/paperController.js](./server/controllers/paperController.js)
- [server/utils/validators.js](./server/utils/validators.js)
- [server/services/notificationService.js](./server/services/notificationService.js)
- [server/services/emailService.js](./server/services/emailService.js)

### 3. Admin workflow

Frontend:

- [client/src/pages/AdminLoginPage.jsx](./client/src/pages/AdminLoginPage.jsx)
- [client/src/pages/AdminDashboardPage.jsx](./client/src/pages/AdminDashboardPage.jsx)
- [client/src/components/AdminProtectedRoute.jsx](./client/src/components/AdminProtectedRoute.jsx)

Backend:

- [server/routes/adminRoutes.js](./server/routes/adminRoutes.js)
- [server/controllers/adminController.js](./server/controllers/adminController.js)
- [server/middleware/authMiddleware.js](./server/middleware/authMiddleware.js)

## What Graphify Highlighted

Graphify identified these core “hub” functions as the most connected:

- `request()`
- `responseWrapper()`
- `createPaper()`
- `updatePaperStatus()`
- `enrichPaper()`
- `queueNotification()`
- `sendEmail()`
- `sendSafely()`
- `buildHtml()`
- `normalizeText()`

That means the project’s center of gravity is:

- frontend API communication
- paper workflow logic
- validation
- notification and email delivery

This is a good sign because those are the real business-critical parts of the app.

## Quick Reading Order For New Contributors

If someone needs to understand the project quickly, this is the best reading order:

1. [README.md](./README.md)
2. [client/src/App.jsx](./client/src/App.jsx)
3. [client/src/data/conferenceData.js](./client/src/data/conferenceData.js)
4. [client/src/services/api.js](./client/src/services/api.js)
5. [client/src/pages/RegistrationPage.jsx](./client/src/pages/RegistrationPage.jsx)
6. [client/src/pages/SubmitPaperPage.jsx](./client/src/pages/SubmitPaperPage.jsx)
7. [server/server.js](./server/server.js)
8. [server/controllers/paperController.js](./server/controllers/paperController.js)
9. [server/controllers/registrationController.js](./server/controllers/registrationController.js)
10. [server/services/notificationService.js](./server/services/notificationService.js)
11. [server/services/emailService.js](./server/services/emailService.js)

## How To Regenerate The Graph

From the project root:

```bash
graphify update .
```

That will update:

- `graphify-out/graph.json`
- `graphify-out/graph.html`
- `graphify-out/GRAPH_REPORT.md`

## What To Use Each Graphify File For

- [graphify-out/graph.html](./graphify-out/graph.html)
  - interactive visual exploration
- [graphify-out/GRAPH_REPORT.md](./graphify-out/GRAPH_REPORT.md)
  - quick summary of hubs, communities, and connections
- [graphify-out/graph.json](./graphify-out/graph.json)
  - raw graph data for tooling or custom analysis

## Bottom Line

This codebase is best understood as:

- a content-driven React frontend
- backed by an Express API
- with paper and registration workflows as the main business logic
- and a notification/email system as the main integration layer

If you understand those four parts, you understand most of the project.

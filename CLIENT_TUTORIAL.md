# SRES-26 Client Tutorial Guide

This document is a client-facing walkthrough for the SRES-26 conference website. It can be shared with organizers, coordinators, and review stakeholders to understand how the portal works from both the visitor side and the admin side.

## Live Links

- Main website: `https://avcoe-civil-conference.vercel.app/`
- Admin login: `https://avcoe-civil-conference.vercel.app/admin/login`
- Track paper: `https://avcoe-civil-conference.vercel.app/track-paper`

## Website Purpose

The website is designed to help manage the core SRES-26 conference workflow in one place. It currently supports:

- conference information and branding
- institute and department overview
- committee presentation
- conference themes
- registration details and payment proof upload
- paper submission with manuscript upload
- paper status tracking
- admin-side review and management
- automated confirmation and update emails

## Public User Walkthrough

### 1. Explore the Website

Visitors can open the main site and browse these sections from the navigation menu:

- Home
- Keynote Speakers
- Committee
- Themes & Schedule
- Registration Details
- Important Dates
- Publications
- Submit Paper

This gives users a complete overview of the conference, its theme, important milestones, and submission process.

### 2. Register for the Conference

To register:

1. Open the `Registration Details` page.
2. Review the available registration category and fee details.
3. Check the bank/payment details shown on the page.
4. Fill in the registration form with:
   - Full name
   - Email address
   - Phone number
   - College or organization name
   - Registration category
   - Payment reference / UTR number
5. Upload the payment proof.
6. Click `Register Now`.

### Expected Result After Registration

After a successful registration:

- the record is saved in the system
- a confirmation message appears on the website
- a confirmation email is sent to the registered email address
- the admin can review the submitted payment proof

### 3. Submit a Paper

To submit a paper:

1. Open the `Submit Paper` page.
2. Review the submission guidelines and process.
3. Fill in the paper details:
   - Author name
   - Author email
   - Paper title
   - Abstract
4. Upload the manuscript in PDF format.
5. Click `Submit Paper`.

### Expected Result After Paper Submission

After a successful paper submission:

- the submission is saved in the system
- a unique tracking ID is generated
- a success confirmation panel appears on the website
- a confirmation email is sent to the author email address

Important:

- the author should keep the tracking ID safely
- only PDF manuscripts should be uploaded

### 4. Track Paper Status

Authors can track their submission at:

`https://avcoe-civil-conference.vercel.app/track-paper`

To check status:

1. Enter the tracking ID
2. Enter the same author email used during paper submission
3. Click `Check Status`

The tracking page displays:

- paper title
- author name
- current submission status
- review note, if added by admin
- registration readiness
- timeline of updates

## Admin Walkthrough

Important:

- Admin credentials should be shared separately and privately.
- This document should not include the actual admin username or password.

### 1. Access the Admin Panel

Open:

`https://avcoe-civil-conference.vercel.app/admin/login`

Enter the admin credentials provided separately.

### 2. Admin Dashboard Features

The admin panel supports:

- viewing registrations
- viewing paper submissions
- searching records
- filtering records
- paginating through records
- exporting CSV data
- opening record detail drawers
- editing registration details
- editing paper metadata
- updating paper review status
- reviewing payment status
- downloading uploaded PDF manuscripts
- opening payment proof files
- deleting records if required

### 3. Reviewing Registrations

Inside the registrations panel, admin can:

1. search for a participant
2. open the registration detail view
3. inspect the uploaded payment proof
4. verify or update payment status
5. save the updated record

When the registration status is updated, the participant receives an email notification.

### 4. Reviewing Papers

Inside the papers panel, admin can:

1. search for the paper
2. open the paper detail view
3. inspect the submitted metadata
4. open or download the uploaded manuscript PDF
5. update the review status
6. add a review note
7. save the updated record

When the paper status changes:

- the author receives an email update
- the tracking page reflects the new status

## Suggested Client Review Flow

For a complete review of the website, this sequence is recommended:

1. open the home page and review the overall design and branding
2. review the committee page and conference themes
3. review the registration page and payment details
4. submit one test registration
5. submit one test paper
6. confirm that the success message appears on the website
7. check the confirmation email
8. open the `Track Paper` page and verify the submission appears
9. log in to the admin dashboard
10. verify that the registration and paper appear in admin
11. update a paper status and confirm the tracking page and email update reflect the change

## Current Notes

- The portal is live and working for client review.
- Some conference content may still be refined after final client approval.
- Speaker, publication, and final schedule updates can be added later if required.
- Uploaded files are available for admin review through the system.

## Support and Communication

For conference-related assistance, organizers can use the contact details shown on the website. For admin access, credentials should always be shared privately and not included in publicly forwarded documents.

# Graph Report - avcoe-civil-conference  (2026-04-23)

## Corpus Check
- 48 files · ~693,444 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 165 nodes · 203 edges · 12 communities detected
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]

## God Nodes (most connected - your core abstractions)
1. `request()` - 14 edges
2. `responseWrapper()` - 13 edges
3. `enrichPaper()` - 6 edges
4. `createPaper()` - 6 edges
5. `updatePaperStatus()` - 6 edges
6. `sendEmail()` - 6 edges
7. `sendSafely()` - 6 edges
8. `normalizeText()` - 6 edges
9. `queueNotification()` - 5 edges
10. `buildHtml()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `loginAdmin()` --calls--> `normalizeText()`  [INFERRED]
  server\controllers\adminController.js → server\utils\validators.js
- `createPaper()` --calls--> `validatePaperPayload()`  [INFERRED]
  server\controllers\paperController.js → server\utils\validators.js
- `createPaper()` --calls--> `queueNotification()`  [INFERRED]
  server\controllers\paperController.js → server\services\notificationService.js
- `updatePaper()` --calls--> `validatePaperPayload()`  [INFERRED]
  server\controllers\paperController.js → server\utils\validators.js
- `updatePaperStatus()` --calls--> `validatePaperStatusPayload()`  [INFERRED]
  server\controllers\paperController.js → server\utils\validators.js

## Communities

### Community 0 - "Community 0"
Cohesion: 0.25
Nodes (16): ApiError, buildHeaders(), deletePaper(), deleteRegistration(), fetchAdminOverview(), fetchPapers(), fetchRegistrations(), loginAdmin() (+8 more)

### Community 1 - "Community 1"
Cohesion: 0.29
Nodes (12): buildTrackingId(), createPaper(), deletePaper(), enrichPaper(), ensurePaperWorkflowFields(), generateTrackingId(), getRegistrationSnapshot(), removeUploadedFile() (+4 more)

### Community 2 - "Community 2"
Cohesion: 0.24
Nodes (4): AdminDashboardPage(), formatDate(), formatLabel(), getStatusBadgeClass()

### Community 3 - "Community 3"
Cohesion: 0.36
Nodes (7): loginAdmin(), isValidEmail(), normalizeText(), validatePaperPayload(), validatePaperStatusPayload(), validatePaperTrackingPayload(), validateRegistrationPayload()

### Community 4 - "Community 4"
Cohesion: 0.5
Nodes (7): ensureOutboxDirectory(), getDeliveryMode(), getTransporter(), parseFromAddress(), sendEmail(), sendViaBrevoApi(), writePreviewEmail()

### Community 6 - "Community 6"
Cohesion: 0.67
Nodes (6): buildHtml(), sendPaperStatusEmail(), sendPaperSubmittedEmail(), sendRegistrationStatusEmail(), sendRegistrationSubmittedEmail(), sendSafely()

### Community 7 - "Community 7"
Cohesion: 0.43
Nodes (5): queueNotification(), createRegistration(), deleteRegistration(), removeUploadedFile(), updateRegistration()

### Community 8 - "Community 8"
Cohesion: 0.6
Nodes (4): CommitteePage(), getInitials(), LeadershipCard(), parseMember()

### Community 9 - "Community 9"
Cohesion: 0.8
Nodes (4): formatDate(), formatPaymentStatus(), formatStatus(), TrackPaperPage()

### Community 12 - "Community 12"
Cohesion: 1.0
Nodes (2): App(), withPageSuspense()

### Community 13 - "Community 13"
Cohesion: 1.0
Nodes (2): RegistrationPage(), segmentButtonClass()

### Community 14 - "Community 14"
Cohesion: 1.0
Nodes (2): segmentButtonClass(), ThemesSchedulePage()

## Knowledge Gaps
- **Thin community `Community 12`** (3 nodes): `App()`, `withPageSuspense()`, `App.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (3 nodes): `RegistrationPage.jsx`, `RegistrationPage()`, `segmentButtonClass()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (3 nodes): `ThemesSchedulePage.jsx`, `segmentButtonClass()`, `ThemesSchedulePage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `queueNotification()` connect `Community 7` to `Community 1`, `Community 6`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `sendSafely()` connect `Community 6` to `Community 4`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `sendEmail()` connect `Community 4` to `Community 6`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `createPaper()` (e.g. with `validatePaperPayload()` and `queueNotification()`) actually correct?**
  _`createPaper()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `updatePaperStatus()` (e.g. with `validatePaperStatusPayload()` and `queueNotification()`) actually correct?**
  _`updatePaperStatus()` has 2 INFERRED edges - model-reasoned connections that need verification._
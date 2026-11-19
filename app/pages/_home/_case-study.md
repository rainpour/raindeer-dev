---
title: Technical Case Study
---

## Technical Case Study

Anti-forgery tokens, which turn away a form posted from another site.

- **It's built from events.** A RequestEvent observer checks each form on the way in, and the routed node sets the cookie with the response it already makes. There's no middleware stack, and the router went back to only routing.
- **Each gem only does its own part:**
  - Antlers only knows it's given a token, and hands on what its render context has.
  - Observers only knows about order.
  - LowNode only knows its render context, which has the routed node.
  - Raindeer only knows about requests, cookies and its secret.

<p><a href="/docs/middleware" role="button"><i class="bi bi-arrow-repeat"></i>See Middleware</a></p>

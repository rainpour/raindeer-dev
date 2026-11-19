---
title: Technical Case Study
---

## Technical Case Study

Raindeer's architecture through the flow of a simple <a href='/docs/templating#forms'>form</a>:
```ruby
<{ form: '/submit' }>
  <input type="submit" value="Submit">
<{ :form }>
```

When the browser sends this form it makes a request, which goes through each part of Raindeer in turn:

```mermaid
sequenceDiagram
  autonumber
  participant RequestEvent
  participant Protection as CrossOriginProtection
  participant Router
  participant Node
  participant ResponseEvent

  RequestEvent->>Protection: request(event:), before the router
  alt Good Path
    Protection->>Router: nil, so RequestEvent asks its next observer
    Router->>Node: ReceiveEvent, with the form's body
    Node->>ResponseEvent: a redirect, like to /cart
  else Bad Path
    Protection->>ResponseEvent: 403
  end
```

**Each part of the request-response lifecycle has a single responsibility:**
- [Observers](/docs/observers#ordering) only knows about order, which puts the protection before the router
- [CrossOriginProtection](/docs/middleware#cross-origin-protection) only knows where a request came from
- [The router](/docs/routing) only worries about routing
- [LowNode](/docs/nodes) only knows how to answer the event it's given
- [Templates](/docs/templating#forms) only render the form, which needs no hidden token

In other frameworks something like securing a form would ultimately be mixed in with the router, controller and view layers. With Raindeer and observers there is a clean separation of concerns.

<p><a href="/docs/middleware#cross-origin-protection" role="button"><i class="bi bi-arrow-repeat"></i>See Middleware</a></p>

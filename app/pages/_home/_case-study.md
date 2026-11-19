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

This form lives in a LowNode which returns a ResponseEvent. But you get to this form the browser makes a request; A RequestEvent.

```mermaid
sequenceDiagram
  autonumber
  participant RequestEvent
  participant FormTokens as Rain::FormTokens
  participant Router
  participant Node as Routed node
  participant Form as Antlers form tag
  participant ResponseEvent

  RequestEvent->>FormTokens: request(event:), before the router
  alt A form posted without its token
    FormTokens->>ResponseEvent: 403
  else Anything else, like a page or a form with its token
    FormTokens-->>RequestEvent: nil, so the request goes on
    RequestEvent->>Router: request(event:)
    Router->>Node: RouteEvent
    Node->>Form: render, with context event: and routed_node:
    Form->>FormTokens: Antlers.form_token.call(event:, routed_node:)
    opt The browser has no form_key cookie
      FormTokens->>Node: routed_node.set_cookie('form_key', key)
    end
    FormTokens-->>Form: token
    Form-->>Node: the form with a hidden form_token field
    Node->>ResponseEvent: the page, with the cookie in its headers
  end
```

**Each component is single responsibility:**
- The router only worries about routing
- Antlers only knows it's given a token, and hands on what its render context has
- Observers only knows about order
- LowNode only knows its render context, which has the routed node
- Raindeer only knows about requests, cookies and its secret

In other frameworks something like securing a form would ultimately be mixed in with the router, controller and view layers. With Raindeer and observers there is a clean seperation of concerns.

<p><a href="/docs/middleware" role="button"><i class="bi bi-arrow-repeat"></i>See Middleware</a></p>

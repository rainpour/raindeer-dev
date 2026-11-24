---
title: Middleware
published: true
---

<{ :toc }>

Raindeer doesn't use Rack or a traditional middleware API. A middleware is just a pipeline, and in Raindeer everything is a pipeline already. Intercepting the request or response layer can be done in a few different ways. Below they are listed in the order in which they are executed.

## Events

### 1. Boot File

Edit `config/boot.rb` to set things up before or after `require 'raindeer/boot'`.

### 2. `BootEvent` [CANDIDATE]

To intercept Raindeer's own boot process, `BootEvent` provides a more formal API.

**Ordered Actions:**
1. `:before_boot`
2. `:load_config`
3. `:load_providers`
4. `:load_app`
5. `:after_boot`

### 3. `RequestEvent`

Say you want to authenticate, log or redirect before every request, then `RequestEvent.define` is the answer. We do it this way to minimise per-request overhead; if you're handling thousands of requests then you don't want to be processing nice tasty `RouteEvent`s before denying access or issuing redirects.

```ruby
Low::Events::RequestEvent.define do |observers|
  observers = [MyLogger, MyAuthenticator, *observers]
end
```

These additional observers will receive a `:render`/`:receive`/`HTTP_VERB` action, so add a corresponding method to those nodes/custom classes and return `LowNode.render(event:)`, [ResponseEvent](#responseevent) or `nil`.

> [!TIP]
> Event observers should only be redefined once, so keep them in a central location. **Example:** `app/events/request_event`

On the way back out, each observer the request passed is given the response it took, last first, when it has a `response` method. That's `RequestEvent`'s return action, and where to add to every response, like a header or a cookie:

```ruby
module MyHeaders
  def self.response(event:, result:)
    result.response.headers.add('x-frame-options', 'DENY') if result.respond_to?(:response)
  end
end
```

#### Cross-origin protection

Raindeer's own `Rain::CrossOriginProtection` observes `RequestEvent` first. It turns away a request that another site's page makes. That could be a form it posts to yours with a visitor's cookies:

- **Reading always goes through.** GET, HEAD and OPTIONS shouldn't change anything.
- **Browsers say where a request came from** in `Sec-Fetch-Site` and a page can't change it. `same-origin` goes through and so does `none`, which is typed in or bookmarked. `cross-site` and `same-site` get a 403, as another subdomain is only `same-site`.
- **Older browsers send `Origin` instead** and it has to match the request's host.
- **A request with neither isn't from a browser.** It goes through, like a webhook or `curl`.

Observe `Status[403]` to show your own page. Without one Raindeer answers with a plain 403. There's no token or cookie or secret. So pages with forms can be cached and built with `rain static`.

#### Rate limits

`Rain::RateLimit` observes `RequestEvent` next. It turns away a visitor who asks for a path too often. Limit a path that's costly to answer, like a search that queries the database each time. In `config/config.yaml` give each path the requests a minute each visitor may make to it and the paths under it:
```yaml
rate_limits:
  /search: 30
```

- **A visitor is their address** as a proxy like Cloudflare or Caddy passes it on. A request without one, like while developing, isn't limited.
- **The count starts again each minute.** A visitor over the limit gets a 429 with `Retry-After` saying how many seconds are left.
- **It's kept in memory**, so each process counts its own and a restart starts again.

Observe `Status[429]` to show your own page. Without one Raindeer answers with a plain 429.

### 4. `RouteEvent`

Because you can listen to "mid-nodes" along a route, you can `observe '/'` with a `side_effect` action/method to intercept **every** routed request.

### 5. `WildcardEvent`

The router's unmatched requests will not be routed, but a `WildcardEvent` will then be called.

### 6. `StatusEvent`

Observe `Status[404]` or similar for when nothing above returns a non-nil reponse.

## Pipeline Data Flow

Events are Push-based (trigger event) **and** Pull-based (return value). Code that triggers an event receives the output of that event, which may be the output of another sub event and so on.

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

On the way back out, each observer the request passed is given the response it took, last first, when it has a `response` method. That's `RequestEvent`'s return action, and where to add to every response, like a header or a cookie: [UNRELEASED]

```ruby
module MyHeaders
  def self.response(event:, result:)
    result.response.headers.add('x-frame-options', 'DENY') if result.respond_to?(:response)
  end
end
```

Raindeer's own `Rain::FormTokens` observes `RequestEvent` first, to turn away a form posted from another site on the way in. A browser's new key doesn't need the way out: the form tag is given the routed node, the one the request was routed to, in its render context, and sets the cookie with its response.

### 4. `RouteEvent`

Because you can listen to "mid-nodes" along a route, you can `observe '/'` with a `side_effect` action/method to intercept **every** routed request.

### 5. `WildcardEvent`

The router's unmatched requests will not be routed, but a `WildcardEvent` will then be called.

### 6. `StatusEvent`

Observe `Status[404]` or similar for when nothing above returns a non-nil reponse.

## Pipeline Data Flow

Events are Push-based (trigger event) **and** Pull-based (return value). Code that triggers an event receives the output of that event, which may be the output of another sub event and so on.

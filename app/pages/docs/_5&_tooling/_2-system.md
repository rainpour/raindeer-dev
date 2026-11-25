---
title: System UI
published: true
---

Visit http://127.0.0.1:4133/system and you'll see an overview of:
- Basic statistics
- Objects/Events and their observers
- Routes and their observers
- Events as pipelines; which were called and in what order

## Turning it on

The system pages are on while debugging. They're off when `debug_mode` is off, like in production.

Turn them on or off yourself with `system_mode` in `config/config.yaml`:

```yaml
system_mode: true
```

Or with the `RAIN_SYSTEM=1` and `RAIN_SYSTEM=0` environment variables.

Raindeer serves the system pages' own files like their styles. Each link carries Raindeer's version so a cache fetches them fresh after you update. If your app has its own copy in `public/system` you can delete it.

> [!WARNING]
> Anyone can see the system pages when they're on. They show your routes and requests and your app's memory. In production only let administrators see them. With [LowAuth](https://github.com/low-rb/lowauth) add `allows :admin` to every node in `System`. Then pages added later are covered too:
>
> ```ruby
> System.constants.map { |name| System.const_get(name) }.select { |node| node.is_a?(Class) && node < LowNode }.each do |page|
>   page.allows(:admin)
> end
> ```

## Memory

The dashboard shows how much memory your app uses. It also shows how many keys [Observers](/docs/observers) holds and how long the app has run.

Every minute an [Interval](/docs/nodes#intervals) saves these numbers. The dashboard draws the last 3 hours of them as lines. So you can see if memory keeps climbing.

A healthy app's observed keys stay about the same. If they climb with every request then something keeps every request in memory. That's a leak.

## Live stats

The dashboard's numbers refresh each second while the page is in view. The system pages' own requests aren't counted, so the refreshing doesn't show up as traffic.

The dashboard also shows:
- How many visitors came in the last 5 minutes. That's the different addresses requests came from, as a proxy like Cloudflare passes them on. Raindeer keeps only a hash of each address and forgets it after 5 minutes. An address isn't quite a person: people behind one office network count once and bots count too
- Actions per second, averaged over the last minute. That's every event that runs, like a request, a node rendering, a data query or an interval's tick. It counts the system pages' own requests too, so it shows the work the app is really doing
- How many connections are open. Behind a proxy like Caddy these are the proxy's own connections, which it keeps open and reuses, so they aren't people
- Requests per second, averaged over the last minute, and the busiest single second in that minute. These and visitors see every request, so they aren't limited to the last 100
- The typical and slowest response times
- How many threads are running
- How many requests a [rate limit](/docs/middleware#rate-limits) denied in the last 24 hours
- How many objects Ruby holds and how many times it has collected garbage

Live objects get a line each minute too. Like observed keys they should level off. If they keep climbing then something keeps objects it doesn't need.

The dashboard lists each [Interval](/docs/nodes#intervals) your app observes. It shows how often each one runs and what observes it and when it last ran. So you can see that your scheduled jobs are running.

## Requests

The Requests page lists the last 100 requests. The newest is first. Each one shows its path and status and how long it took and how many events it caused. Found requests show first. Missing shows the 404s and Denied shows those a rate limit turned away.

A GET has a Visit button that opens its page. Open a request to see its event tree. That's every event the request caused in the order they happened. Each event sits under the event that caused it. Raindeer already keeps these trees in its event pool so showing them costs nothing extra.

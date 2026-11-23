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

The dashboard also shows:
- How many requests came in the last minute
- The typical and slowest response times
- How many threads are running
- How many objects Ruby holds and how many times it has collected garbage

Live objects get a line each minute too. Like observed keys they should level off. If they keep climbing then something keeps objects it doesn't need.

The dashboard lists each [Interval](/docs/nodes#intervals) your app observes. It shows how often each one runs and what observes it and when it last ran. So you can see that your scheduled jobs are running.

## Requests

The Requests page lists the last 100 requests. The newest is first. Each one shows its path and status and how long it took and how many events it caused.

Open a request to see its event tree. That's every event the request caused in the order they happened. Each event sits under the event that caused it. Raindeer already keeps these trees in its event pool so showing them costs nothing extra.

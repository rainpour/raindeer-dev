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
> Anyone can see the system pages when they're on. They show your routes and your app's memory. In production only let administrators see them. With [LowAuth](https://github.com/low-rb/lowauth) add `allows :admin` to each page:
>
> ```ruby
> [System::DashboardNode, System::EventsNode, System::RoutesNode].each { |page| page.allows(:admin) }
> ```

## Memory

The dashboard shows how much memory your app uses. It also shows how many keys [Observers](/docs/observers) holds and how long the app has run.

Every minute an [Interval](/docs/nodes#intervals) saves these numbers. The dashboard draws the last 3 hours of them as lines. So you can see if memory keeps climbing.

A healthy app's observed keys stay about the same. If they climb with every request then something keeps every request in memory. That's a leak.

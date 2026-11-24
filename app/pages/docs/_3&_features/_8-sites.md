---
title: Sites
published: true
---

<{ :toc }>

One app can serve more than one site, like `sourdough.com.au` for Australia and `sourdough.com` for everyone else. Each request knows the site it came to and who it's for.

## Sites

List your sites in `config/config.yaml` by their host, with the region their visitors are most likely in and the language their pages are written in:
```yaml
sites:
  sourdough.com.au: { region: AU }
  sourdough.com: {}
  levain.fr: { region: FR, language: fr }
```

A region is a two-letter [country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). A site's language defaults to the `source_locale`. A host that isn't listed, like `localhost`, is still a site, just without a region.

Every event made from a request, like a route's or a node's, has its site:
```ruby
event.site.host     # => "sourdough.com.au"
event.site.origin   # => "https://sourdough.com.au"
event.site.region   # => "AU"
event.site.language # => "en"
```

The origin uses the scheme a proxy like Caddy forwarded the request with, so it's `https` behind one. Use it for links that leave the site and come back, like a payment page's return address.

## Locale

A request's locale is who its response is for. It has a language and a region, which can differ, like an American reading the Australian site:
```ruby
event.locale.language # => "en-US"
event.locale.region   # => "AU"
```

The language is the most preferred one in the request's `Accept-Language` header that has [translations](/docs/translations). Without one it's the site's language.

The region is the site's. A site without a region uses the country Cloudflare found the visitor in, from its `CF-IPCountry` header. Without either the region is `nil`, so ask the visitor.

| Site | `CF-IPCountry` | Region |
|---|---|---|
| `sourdough.com.au` | `US` | `AU` |
| `sourdough.com` | `US` | `US` |
| `sourdough.com` | None | `nil` |

Use the language for what a page says and the region for what a visitor can buy, like the country a cart ships to.

## Alternates

`event.site.alternates` lists the same page on each of your sites, for `hreflang` links that tell search engines which site is for which country:
```ruby
<{ for: site in: event.site.alternates }>
  <link rel="alternate" hreflang="{site.hreflang}" href="{site.origin}{event.path}">
<{ :for }>
```

A site with a region is named like `en-au`. A site without one is `x-default`, the site for everyone else.

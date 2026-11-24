---
title: Translations
published: true
---

<{ :toc }>

Because of the way Antlers syntax is designed you can translate text without any `t()` functions, just use existing strings:
```ruby
<html>{"Hello"}</html>
```

Every string in `{}` goes through Antlers, so every one can be translated.  
Text written directly into HTML like `<p>Hello</p>` isn't translated.

One app can also serve more than one site, like `sourdough.com.au` for Australia and `sourdough.com` for everyone else. Each request knows the site it came to and who it's for.

## Strings

Translations are mapped via a YAML file, where the top level keys represent a [language code](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) or region like `en-US:`, followed by key-value mappings of the string to translate from and to.

In `config/translations.yaml` put:
```yaml
es:
  'Hello': 'Hola'
```

A translation replaces the whole string, so `'Hello'` translates `{"Hello"}` but not `{"Hello world"}`. A string without a translation renders as it's written.

## Symbols

You can go one layer of abstraction deeper, instead of replacing the literal text, you can translate a symbol that represents that text. Symbols are useful for text that's long, changes often or appears in many places.

Prefix the symbol with a colon and separate words with underscores:
```ruby
<html>{:app_name}</html>
```

Then in `config/translations.yaml` put its value under `symbols`, using a YAML key without the colon or quotes:
```yaml
symbols:
  app_name: 'Raindeer'
```

The symbol's value is then translated like any other string:
```yaml
symbols:
  app_name: 'Raindeer'
es:
  'Raindeer': 'Renos'
```

A symbol without a value in `symbols` renders its name, like `app_name`.

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

Use the language for what a page says and the region for what a visitor can buy, like the country a cart ships to.

### Language

Set the language your templates are written in with the `source_locale` option in `config/config.yaml`. It defaults to `en`:
```yaml
source_locale: 'de'
```

Each request is rendered in the most preferred language from its `Accept-Language` header that is either the `source_locale` or has translations. A regional language like `es-MX` falls back to `es`. When no language matches, the request is rendered in its site's language, which is the `source_locale` unless the site sets another.

With `source_locale: 'en'` and `es` translations:

| `Accept-Language` | Rendered in |
|---|---|
| `es-MX,es;q=0.9` | `es` |
| `en,es;q=0.5` | `en` |
| `fr` | `en` |
| None | `en` |

Responses say which language they're in with a `Content-Language` header, and include `Vary: Accept-Language` so caches don't serve one language to everyone.

> [!NOTE]
> [Static](/docs/static) builds have no `Accept-Language` header, so pages are built in the `source_locale`.

### Region

The region is the site's. A site without a region uses the country Cloudflare found the visitor in, from its `CF-IPCountry` header. Without either the region is `nil`, so ask the visitor.

| Site | `CF-IPCountry` | Region |
|---|---|---|
| `sourdough.com.au` | `US` | `AU` |
| `sourdough.com` | `US` | `US` |
| `sourdough.com` | None | `nil` |

## Alternates

`event.site.alternates` lists the same page on each of your sites, for `hreflang` links that tell search engines which site is for which country:
```ruby
<{ for: site in: event.site.alternates }>
  <link rel="alternate" hreflang="{site.hreflang}" href="{site.origin}{event.path}">
<{ :for }>
```

A site with a region is named like `en-au`. A site without one is `x-default`, the site for everyone else.

## HTML

Translations are HTML escaped like any other `{}` variable. Use the `<{"Hello"}>` Deerheads syntax to render a translation containing HTML.

Only strings and `:symbols` are translated, never the values of methods or instance variables like `{@user.bio}`. To translate variables use the API.

## API

Translate strings outside of templates with `Antlers::Translations.translate`, which uses the same language as the request. In a request rendered in `es`:
```ruby
Antlers::Translations.translate('Hello') # => "Hola"
Antlers::Translations.translate(:app_name) # => "Renos"
```

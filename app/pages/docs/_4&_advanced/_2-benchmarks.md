---
title: Benchmarks
published: true
---

## CPU-bound

**Configuration:**
- Ruby 4.0.9, 1 thread/fiber
- Raindeer 1.0.57 with LowType's strip mode, which removes types as classes load
- Each column requests the middle route of its group at that path depth, a typical request rather than the best or worst case for a router that checks routes in order
- Sinatra checks every route one by one in the order they are declared, so its speed depends on where a route sits in the list. Roda checks routes one by one too, but only within each branch of its routing tree

> [!NOTE]
> **Requests Per Second:** This CPU-bound metric is a relatively small slice of time in comparison to the typical IO-bound tasks of web applications, such as waiting for the database.

Static routes are nested like REST resources, where a resource has its own route and child routes (`/solo2`, `/solo2/duo5`, `/solo2/duo5/trio3`). Routes with `:id` are REST collections and members (`/solo5`, `/solo5/:id`, `/solo5/:id/duo6`, `/solo5/:id/duo6/:duo_id`).

### 100 routes

40 one segment routes, 30 two segment routes and 30 three segment routes. Each column requests `/solo20`, `/solo1/duo8` and `/solo1/duo3/trio2`.

<table>
  <thead>
    <tr>
      <th>Server</th>
      <th>GET / (req/s)</th>
      <th>1 segment (req/s)</th>
      <th>2 segments (req/s)</th>
      <th>3 segments (req/s)</th>
      <th>Mean latency (3 segments)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Roda</strong> + Falcon</td>
      <td>21,334.40</td>
      <td>17,562.32</td>
      <td>18,326.63</td>
      <td>18,176.45</td>
      <td>2.751 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>19,375.06</td>
      <td>16,674.17</td>
      <td>15,583.34</td>
      <td>14,616.45</td>
      <td>3.421 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>17,234.80</td>
      <td>15,791.53</td>
      <td>14,880.92</td>
      <td>14,187.42</td>
      <td>3.524 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>10,837.05</td>
      <td>9,201.21</td>
      <td>7,864.11</td>
      <td>7,005.06</td>
      <td>7.138 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,782.79</td>
      <td>6,801.74</td>
      <td>6,747.23</td>
      <td>6,702.79</td>
      <td>7.460 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,775.92</td>
      <td>2,762.51</td>
      <td>2,743.24</td>
      <td>2,740.10</td>
      <td>18.248 ms</td>
    </tr>
  </tbody>
</table>

### 100 routes with :id

20 collections with their members, and 5 of them with 6 child collections and their members. Each column requests `/solo10`, `/solo10/42`, `/solo3/42/duo3` and `/solo3/42/duo3/7`.

<table>
  <thead>
    <tr>
      <th>Server</th>
      <th>GET / (req/s)</th>
      <th>1 segment (req/s)</th>
      <th>2 segments (:id) (req/s)</th>
      <th>3 segments (req/s)</th>
      <th>4 segments (:id) (req/s)</th>
      <th>Mean latency (4 segments (:id))</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Roda</strong> + Falcon</td>
      <td>21,732.09</td>
      <td>19,738.78</td>
      <td>19,197.16</td>
      <td>17,247.40</td>
      <td>16,957.67</td>
      <td>2.949 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>18,461.17</td>
      <td>16,532.34</td>
      <td>14,867.84</td>
      <td>13,983.76</td>
      <td>13,106.37</td>
      <td>3.815 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>16,973.52</td>
      <td>15,488.54</td>
      <td>14,220.25</td>
      <td>13,524.60</td>
      <td>12,668.85</td>
      <td>3.947 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>11,073.69</td>
      <td>9,855.04</td>
      <td>9,337.37</td>
      <td>6,545.04</td>
      <td>6,354.21</td>
      <td>7.869 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,707.61</td>
      <td>6,667.42</td>
      <td>6,144.30</td>
      <td>6,128.63</td>
      <td>5,838.21</td>
      <td>8.564 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,766.51</td>
      <td>2,744.32</td>
      <td>2,704.33</td>
      <td>2,694.09</td>
      <td>2,645.22</td>
      <td>18.902 ms</td>
    </tr>
  </tbody>
</table>

### 1000 routes

400 one segment routes, 300 two segment routes and 300 three segment routes. Each column requests `/solo200`, `/solo5/duo15` and `/solo5/duo5/trio2`.

<table>
  <thead>
    <tr>
      <th>Server</th>
      <th>GET / (req/s)</th>
      <th>1 segment (req/s)</th>
      <th>2 segments (req/s)</th>
      <th>3 segments (req/s)</th>
      <th>Mean latency (3 segments)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Roda</strong> + Falcon</td>
      <td>21,816.46</td>
      <td>8,824.83</td>
      <td>17,666.16</td>
      <td>17,997.04</td>
      <td>2.778 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>17,720.71</td>
      <td>15,991.89</td>
      <td>15,363.11</td>
      <td>14,411.88</td>
      <td>3.469 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>16,674.75</td>
      <td>15,214.78</td>
      <td>14,362.71</td>
      <td>13,712.42</td>
      <td>3.646 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,752.54</td>
      <td>6,561.95</td>
      <td>6,634.74</td>
      <td>6,625.73</td>
      <td>7.546 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>10,822.20</td>
      <td>4,174.08</td>
      <td>1,810.63</td>
      <td>1,724.42</td>
      <td>28.995 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,727.76</td>
      <td>2,722.02</td>
      <td>2,705.64</td>
      <td>2,693.63</td>
      <td>18.562 ms</td>
    </tr>
  </tbody>
</table>

### 1000 routes with :id

200 collections with their members, and 10 of them with 30 child collections and their members. Each column requests `/solo100`, `/solo100/42`, `/solo5/42/duo15` and `/solo5/42/duo15/7`.

<table>
  <thead>
    <tr>
      <th>Server</th>
      <th>GET / (req/s)</th>
      <th>1 segment (req/s)</th>
      <th>2 segments (:id) (req/s)</th>
      <th>3 segments (req/s)</th>
      <th>4 segments (:id) (req/s)</th>
      <th>Mean latency (4 segments (:id))</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>18,233.62</td>
      <td>16,219.50</td>
      <td>14,690.91</td>
      <td>13,813.76</td>
      <td>12,794.10</td>
      <td>3.908 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>16,888.35</td>
      <td>15,379.69</td>
      <td>14,070.87</td>
      <td>13,153.86</td>
      <td>12,433.63</td>
      <td>4.021 ms</td>
    </tr>
    <tr>
      <td><strong>Roda</strong> + Falcon</td>
      <td>21,757.93</td>
      <td>14,277.14</td>
      <td>13,860.24</td>
      <td>10,015.18</td>
      <td>9,909.50</td>
      <td>5.046 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,756.89</td>
      <td>6,712.08</td>
      <td>6,243.84</td>
      <td>6,250.15</td>
      <td>5,910.57</td>
      <td>8.459 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>10,756.62</td>
      <td>4,236.13</td>
      <td>4,352.46</td>
      <td>1,700.91</td>
      <td>1,699.81</td>
      <td>29.415 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,726.10</td>
      <td>2,721.06</td>
      <td>2,691.24</td>
      <td>2,677.18</td>
      <td>2,623.38</td>
      <td>19.059 ms</td>
    </tr>
  </tbody>
</table>

### Templates

The route tables above return a plain string. Here, Raindeer and Roda both render the same list of 10 users, with each value HTML escaped: Raindeer as an RBX template and Roda as an ERB template with its `render` plugin. Raindeer uses Antlers, which compiles RBX templates to Ruby on their first render, like ERB.

<table>
  <thead>
    <tr>
      <th>Server</th>
      <th>Template (req/s)</th>
      <th>Mean latency (Template)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Roda</strong> + Falcon</td>
      <td>18,373.40</td>
      <td>2.721 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>14,293.22</td>
      <td>3.498 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>13,529.14</td>
      <td>3.696 ms</td>
    </tr>
  </tbody>
</table>

<em><sup>*</sup>LowLoop is the default server for Raindeer</em>

**See:** [raindeer-benchmarks](https://github.com/rainpour/raindeer-benchmarks) repo

## IO-bound

Each request to `/slow` waits 50ms, like a database query, then returns a plain string. One request at a time could do 20 requests per second, so the most a server can do is 20 times the number of requests sent at once. Every app has the same 1000 routes as above.

Every server here waits on requests with Ruby's fiber scheduler, so they all reach that limit at 50 at once, and most do at 200. The differences show at 1000 at once, where each server's CPU cost per request starts to count.

<table>
  <thead>
    <tr>
      <th>Server</th>
      <th>/slow, 50 at once (req/s)</th>
      <th>/slow, 200 at once (req/s)</th>
      <th>/slow, 1000 at once (req/s)</th>
      <th>Mean latency (/slow, 1000 at once)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Roda</strong> + Falcon</td>
      <td>921.59</td>
      <td>3,671.64</td>
      <td>14,151.52</td>
      <td>70.664 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>931.30</td>
      <td>3,701.46</td>
      <td>10,722.05</td>
      <td>93.266 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>934.04</td>
      <td>3,364.61</td>
      <td>9,314.92</td>
      <td>107.355 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>922.76</td>
      <td>3,697.44</td>
      <td>7,466.18</td>
      <td>133.937 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>904.92</td>
      <td>3,466.78</td>
      <td>5,069.24</td>
      <td>197.268 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>938.40</td>
      <td>2,601.43</td>
      <td>2,577.97</td>
      <td>387.903 ms</td>
    </tr>
  </tbody>
</table>

## Integrations

These integrations are experimental and don't suport the full Raindeer API such as `Interval` yet.

### Falcon

### Iodine

If you really need CPU-bound speed then you can boot Raindeer via Iodine. Compared to LowLoop, this currently increases requests per second by **~10-16%** and decreases latency by **~14%**. It involves a Rack adapter (for now) and of course, the absence of LowLoop with its Matrix, Interval and Async related features.

**Iodine Boot:**
```ruby
require 'iodine'
require_relative 'rack_adapter'

Iodine.threads = 1
Iodine.workers = 1

port = ENV.fetch('PORT', '4133')
address = ENV.fetch('BIND', '127.0.0.1')

Iodine.listen(service: :http, handler: RackAdapter.new, port:, address:)
Iodine.start
```

**Rack Adapter:**
```ruby
require 'bundler/setup'
require 'rack'
require 'raindeer/boot'

Low::Events::RequestEvent.define do |observers|
  observers << Providers['rain.router']
end

class RackAdapter
  HEADER_NAME_CACHE = Hash.new { |cache, key| cache[key] = key.delete_prefix('HTTP_').tr('_', '-').downcase.freeze }

  def call(env)
    http_request = build_request(env)
    response = Low::Events::RequestEvent.take(request: http_request).response
    build_rack_response(response)
  end

  private

  BODY_METHODS = %w[POST PUT PATCH].freeze

  def build_request(env)
    body = env['rack.input']&.read if BODY_METHODS.include?(env['REQUEST_METHOD'])
    body = nil if body.nil? || body.empty?

    headers = Protocol::HTTP::Headers.new(
      env.filter_map do |key, value|
        next unless key.start_with?('HTTP_')

        [HEADER_NAME_CACHE[key], value]
      end
    )

    query = env['QUERY_STRING']
    path = query.nil? || query.empty? ? env['PATH_INFO'] : "#{env['PATH_INFO']}?#{query}"
    authority = env['HTTP_HOST'] || "#{env['SERVER_NAME']}:#{env['SERVER_PORT']}"

    Protocol::HTTP::Request.new(
      env['rack.url_scheme'],
      authority,
      env['REQUEST_METHOD'],
      path,
      'HTTP/1.1',
      headers,
      body
    )
  end

  def build_rack_response(response)
    body_data = response.body.respond_to?(:file) ? File.binread(response.body.file.path) : (response.body.read || '')

    rack_headers = {}
    response.headers.fields.each { |key, value| rack_headers[key.to_s] = value.to_s }
    rack_headers['content-length'] ||= body_data.bytesize.to_s

    [response.status, rack_headers, [body_data]]
  end
end
```

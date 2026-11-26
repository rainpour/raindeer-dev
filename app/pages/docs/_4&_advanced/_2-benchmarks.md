---
title: Benchmarks
published: true
---

## CPU-bound

**Configuration:**
- Ruby 4.0.9, 1 thread/fiber
- Raindeer 1.0.54 with LowType's strip mode, which removes types as classes load
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
      <td>21,691.97</td>
      <td>17,888.67</td>
      <td>19,097.64</td>
      <td>19,369.67</td>
      <td>2.581 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>16,137.86</td>
      <td>13,769.01</td>
      <td>12,596.89</td>
      <td>11,384.95</td>
      <td>4.392 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>15,546.74</td>
      <td>13,388.85</td>
      <td>12,351.71</td>
      <td>11,430.45</td>
      <td>4.374 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>10,833.90</td>
      <td>9,237.80</td>
      <td>7,949.40</td>
      <td>7,124.42</td>
      <td>7.018 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,820.23</td>
      <td>6,827.31</td>
      <td>6,805.90</td>
      <td>6,771.51</td>
      <td>7.384 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,786.46</td>
      <td>2,721.80</td>
      <td>2,685.70</td>
      <td>2,674.03</td>
      <td>18.698 ms</td>
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
      <td>21,547.48</td>
      <td>19,625.97</td>
      <td>19,266.12</td>
      <td>17,210.80</td>
      <td>16,933.88</td>
      <td>2.953 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>15,530.83</td>
      <td>13,465.68</td>
      <td>12,199.63</td>
      <td>11,206.06</td>
      <td>10,144.78</td>
      <td>4.929 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>15,324.33</td>
      <td>13,148.99</td>
      <td>11,644.63</td>
      <td>10,842.84</td>
      <td>9,516.76</td>
      <td>5.254 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>10,287.65</td>
      <td>9,146.32</td>
      <td>8,768.50</td>
      <td>6,216.83</td>
      <td>6,028.71</td>
      <td>8.294 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,243.16</td>
      <td>6,169.22</td>
      <td>5,881.46</td>
      <td>5,671.11</td>
      <td>5,447.84</td>
      <td>9.178 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,602.96</td>
      <td>2,409.32</td>
      <td>2,669.29</td>
      <td>2,667.57</td>
      <td>2,621.43</td>
      <td>19.074 ms</td>
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
      <td>20,820.08</td>
      <td>8,667.57</td>
      <td>17,574.41</td>
      <td>18,305.06</td>
      <td>2.731 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>17,118.55</td>
      <td>13,532.02</td>
      <td>12,132.90</td>
      <td>11,083.94</td>
      <td>4.511 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>14,772.19</td>
      <td>12,598.73</td>
      <td>11,576.58</td>
      <td>10,505.10</td>
      <td>4.760 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,366.13</td>
      <td>6,407.86</td>
      <td>6,193.22</td>
      <td>6,304.08</td>
      <td>7.931 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>10,361.38</td>
      <td>3,950.23</td>
      <td>1,735.68</td>
      <td>1,654.84</td>
      <td>30.214 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,527.49</td>
      <td>2,648.78</td>
      <td>2,614.61</td>
      <td>2,642.22</td>
      <td>18.923 ms</td>
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
      <td><strong>Roda</strong> + Falcon</td>
      <td>20,378.72</td>
      <td>13,456.65</td>
      <td>13,078.95</td>
      <td>9,485.95</td>
      <td>9,312.73</td>
      <td>5.369 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>16,321.35</td>
      <td>13,105.70</td>
      <td>11,703.08</td>
      <td>10,563.26</td>
      <td>9,672.09</td>
      <td>5.170 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>13,803.55</td>
      <td>12,109.92</td>
      <td>10,859.51</td>
      <td>9,980.73</td>
      <td>9,139.51</td>
      <td>5.471 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,301.70</td>
      <td>6,299.20</td>
      <td>5,863.55</td>
      <td>5,833.01</td>
      <td>5,570.67</td>
      <td>8.976 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>10,193.36</td>
      <td>4,206.78</td>
      <td>4,282.96</td>
      <td>1,682.96</td>
      <td>1,663.26</td>
      <td>30.061 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,677.32</td>
      <td>2,649.90</td>
      <td>2,618.35</td>
      <td>2,590.65</td>
      <td>2,573.70</td>
      <td>19.427 ms</td>
    </tr>
  </tbody>
</table>

### Templates

The route tables above return a plain string. Here, Raindeer and Roda both render the same list of 10 users, with each value HTML escaped: Raindeer as an RBX template and Roda as an ERB template with its `render` plugin.

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
      <td>17,557.09</td>
      <td>2.848 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>9,457.89</td>
      <td>5.287 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>9,288.25</td>
      <td>5.383 ms</td>
    </tr>
  </tbody>
</table>

<em><sup>*</sup>LowLoop is the default server for Raindeer</em>

**See:** [raindeer-benchmarks](https://github.com/rainpour/raindeer-benchmarks) repo

## IO-bound

Each request to `/slow` waits 50ms, like a database query, then returns a plain string. One request at a time could do 20 requests per second, so the most a server can do is 20 times the number of requests sent at once. Every app has the same 1000 routes as above.

Every server here waits on requests with Ruby's fiber scheduler, so they all reach that limit at 50 and 200 at once. The differences show at 1000 at once, where each server's CPU cost per request starts to count.

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
      <td>954.83</td>
      <td>3,735.00</td>
      <td>12,836.48</td>
      <td>77.903 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>958.59</td>
      <td>3,802.60</td>
      <td>9,679.67</td>
      <td>103.309 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>946.41</td>
      <td>3,747.76</td>
      <td>8,468.39</td>
      <td>118.086 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>954.52</td>
      <td>3,776.84</td>
      <td>7,311.70</td>
      <td>136.767 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>942.52</td>
      <td>3,619.49</td>
      <td>5,379.23</td>
      <td>185.900 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>961.06</td>
      <td>2,640.92</td>
      <td>2,581.94</td>
      <td>387.306 ms</td>
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

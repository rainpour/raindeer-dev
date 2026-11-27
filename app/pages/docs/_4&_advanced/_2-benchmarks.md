---
title: Benchmarks
published: true
---

## CPU-bound

**Configuration:**
- Ruby 4.0.9, 1 thread/fiber
- Raindeer 1.0.59 with LowType's strip mode, which removes types as classes load
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
      <td>21,290.37</td>
      <td>17,661.20</td>
      <td>18,201.62</td>
      <td>18,365.98</td>
      <td>2.722 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>18,687.80</td>
      <td>17,336.94</td>
      <td>16,757.67</td>
      <td>16,205.17</td>
      <td>3.085 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>17,146.48</td>
      <td>16,336.05</td>
      <td>15,836.00</td>
      <td>14,791.40</td>
      <td>3.380 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>10,946.81</td>
      <td>9,261.49</td>
      <td>7,841.52</td>
      <td>7,020.88</td>
      <td>7.122 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,800.47</td>
      <td>6,791.27</td>
      <td>6,759.36</td>
      <td>6,708.14</td>
      <td>7.454 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,789.38</td>
      <td>2,782.46</td>
      <td>2,751.49</td>
      <td>2,731.34</td>
      <td>18.306 ms</td>
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
      <td>22,551.55</td>
      <td>20,320.31</td>
      <td>19,875.88</td>
      <td>17,774.11</td>
      <td>17,403.23</td>
      <td>2.873 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>18,496.78</td>
      <td>17,216.68</td>
      <td>15,891.43</td>
      <td>15,601.31</td>
      <td>14,777.66</td>
      <td>3.383 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>16,841.88</td>
      <td>16,036.29</td>
      <td>14,920.56</td>
      <td>14,690.47</td>
      <td>13,985.56</td>
      <td>3.575 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>11,020.19</td>
      <td>9,925.48</td>
      <td>9,334.38</td>
      <td>6,588.27</td>
      <td>6,427.53</td>
      <td>7.779 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,720.59</td>
      <td>6,640.66</td>
      <td>6,185.38</td>
      <td>6,140.41</td>
      <td>5,854.65</td>
      <td>8.540 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,766.36</td>
      <td>2,762.90</td>
      <td>2,699.66</td>
      <td>2,690.40</td>
      <td>2,676.02</td>
      <td>18.684 ms</td>
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
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>18,328.36</td>
      <td>16,813.22</td>
      <td>16,729.71</td>
      <td>16,040.64</td>
      <td>3.117 ms</td>
    </tr>
    <tr>
      <td><strong>Roda</strong> + Falcon</td>
      <td>21,711.07</td>
      <td>8,843.61</td>
      <td>17,630.36</td>
      <td>17,703.24</td>
      <td>2.824 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>16,697.64</td>
      <td>15,755.56</td>
      <td>15,285.12</td>
      <td>15,111.31</td>
      <td>3.309 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,678.99</td>
      <td>6,624.84</td>
      <td>6,585.38</td>
      <td>6,636.50</td>
      <td>7.534 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>10,777.62</td>
      <td>4,158.10</td>
      <td>1,790.16</td>
      <td>1,706.17</td>
      <td>29.305 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,731.45</td>
      <td>2,721.34</td>
      <td>2,710.47</td>
      <td>2,685.76</td>
      <td>18.617 ms</td>
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
      <td>17,912.38</td>
      <td>16,868.00</td>
      <td>15,564.26</td>
      <td>15,485.16</td>
      <td>14,847.74</td>
      <td>3.368 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>16,636.93</td>
      <td>15,840.98</td>
      <td>14,920.38</td>
      <td>14,157.15</td>
      <td>13,688.20</td>
      <td>3.653 ms</td>
    </tr>
    <tr>
      <td><strong>Roda</strong> + Falcon</td>
      <td>21,669.15</td>
      <td>14,275.49</td>
      <td>13,912.20</td>
      <td>10,056.99</td>
      <td>9,901.61</td>
      <td>5.050 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,811.50</td>
      <td>6,763.20</td>
      <td>6,256.98</td>
      <td>6,250.61</td>
      <td>5,936.97</td>
      <td>8.422 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>10,694.80</td>
      <td>4,222.24</td>
      <td>4,360.78</td>
      <td>1,709.45</td>
      <td>1,695.39</td>
      <td>29.492 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,729.90</td>
      <td>2,714.41</td>
      <td>2,670.72</td>
      <td>2,667.04</td>
      <td>2,623.19</td>
      <td>19.061 ms</td>
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
      <td>18,187.99</td>
      <td>2.749 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>14,587.68</td>
      <td>3.428 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>13,925.66</td>
      <td>3.590 ms</td>
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
      <td>925.14</td>
      <td>3,685.90</td>
      <td>14,337.82</td>
      <td>69.746 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>931.84</td>
      <td>3,390.63</td>
      <td>10,800.16</td>
      <td>92.591 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>929.35</td>
      <td>3,696.37</td>
      <td>10,352.12</td>
      <td>96.599 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>927.44</td>
      <td>3,660.01</td>
      <td>7,264.17</td>
      <td>137.662 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>901.73</td>
      <td>3,574.02</td>
      <td>4,947.51</td>
      <td>202.122 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>938.41</td>
      <td>2,656.42</td>
      <td>2,598.55</td>
      <td>384.831 ms</td>
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

---
title: Benchmarks
published: true
---

## CPU-bound

**Configuration:**
- Ruby 4.0.9, 1 thread/fiber
- Raindeer 1.0.55 with LowType's strip mode, which removes types as classes load
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
      <td>22,011.98</td>
      <td>18,114.10</td>
      <td>18,711.58</td>
      <td>18,615.25</td>
      <td>2.686 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>17,508.47</td>
      <td>14,338.68</td>
      <td>13,084.59</td>
      <td>11,846.62</td>
      <td>4.221 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>15,596.01</td>
      <td>13,760.64</td>
      <td>12,690.00</td>
      <td>11,340.47</td>
      <td>4.409 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>10,834.69</td>
      <td>9,298.61</td>
      <td>7,953.30</td>
      <td>7,120.84</td>
      <td>7.022 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,901.24</td>
      <td>6,856.17</td>
      <td>6,755.28</td>
      <td>6,806.30</td>
      <td>7.346 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,785.44</td>
      <td>2,763.99</td>
      <td>2,751.36</td>
      <td>2,740.35</td>
      <td>18.246 ms</td>
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
      <td>21,915.91</td>
      <td>19,871.69</td>
      <td>19,532.57</td>
      <td>17,798.84</td>
      <td>16,920.17</td>
      <td>2.955 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>16,610.74</td>
      <td>14,155.19</td>
      <td>12,728.48</td>
      <td>11,631.04</td>
      <td>10,656.00</td>
      <td>4.692 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>15,927.50</td>
      <td>13,623.80</td>
      <td>11,944.73</td>
      <td>10,944.54</td>
      <td>10,353.75</td>
      <td>4.829 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>10,921.89</td>
      <td>9,850.68</td>
      <td>9,370.29</td>
      <td>6,634.77</td>
      <td>6,357.14</td>
      <td>7.865 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,686.35</td>
      <td>6,650.19</td>
      <td>6,139.62</td>
      <td>6,157.11</td>
      <td>5,831.42</td>
      <td>8.574 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,760.55</td>
      <td>2,751.24</td>
      <td>2,704.11</td>
      <td>2,654.54</td>
      <td>2,645.84</td>
      <td>18.898 ms</td>
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
      <td>21,715.41</td>
      <td>8,936.48</td>
      <td>18,016.18</td>
      <td>18,368.42</td>
      <td>2.722 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>16,600.84</td>
      <td>13,932.39</td>
      <td>12,631.56</td>
      <td>11,562.64</td>
      <td>4.324 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>15,919.65</td>
      <td>13,683.82</td>
      <td>12,365.65</td>
      <td>10,990.31</td>
      <td>4.549 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,414.99</td>
      <td>6,623.03</td>
      <td>6,742.08</td>
      <td>6,636.49</td>
      <td>7.534 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>10,250.92</td>
      <td>4,150.17</td>
      <td>1,791.97</td>
      <td>1,657.80</td>
      <td>30.161 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,721.32</td>
      <td>2,699.18</td>
      <td>2,690.18</td>
      <td>2,660.71</td>
      <td>18.792 ms</td>
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
      <td>20,898.97</td>
      <td>14,117.46</td>
      <td>13,232.58</td>
      <td>9,556.56</td>
      <td>9,872.44</td>
      <td>5.065 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>16,761.94</td>
      <td>13,831.76</td>
      <td>12,130.74</td>
      <td>11,050.87</td>
      <td>9,967.45</td>
      <td>5.016 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>14,245.38</td>
      <td>12,908.60</td>
      <td>10,858.20</td>
      <td>10,144.38</td>
      <td>9,266.00</td>
      <td>5.396 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,216.12</td>
      <td>6,181.94</td>
      <td>5,734.90</td>
      <td>5,676.95</td>
      <td>5,484.24</td>
      <td>9.117 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>10,164.26</td>
      <td>4,156.71</td>
      <td>4,249.11</td>
      <td>1,657.14</td>
      <td>1,644.50</td>
      <td>30.404 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,731.98</td>
      <td>2,705.49</td>
      <td>2,644.96</td>
      <td>2,646.09</td>
      <td>2,608.14</td>
      <td>19.171 ms</td>
    </tr>
  </tbody>
</table>

### Templates

The route tables above return a plain string. Here, Raindeer and Roda both render the same list of 10 users, with each value HTML escaped: Raindeer as an RBX template and Roda as an ERB template with its `render` plugin. Raindeer uses Antlers 1.5.11, which compiles RBX templates to Ruby on their first render, like ERB.

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
      <td>17,751.47</td>
      <td>2.817 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>12,644.91</td>
      <td>3.954 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>11,479.59</td>
      <td>4.356 ms</td>
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
      <td>953.41</td>
      <td>3,716.94</td>
      <td>13,514.73</td>
      <td>73.993 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>955.09</td>
      <td>3,760.00</td>
      <td>9,753.40</td>
      <td>102.528 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>956.44</td>
      <td>3,431.85</td>
      <td>8,965.86</td>
      <td>111.534 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>954.40</td>
      <td>3,633.41</td>
      <td>7,428.26</td>
      <td>134.621 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>944.97</td>
      <td>3,633.74</td>
      <td>5,179.28</td>
      <td>193.077 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>960.24</td>
      <td>2,577.46</td>
      <td>2,566.20</td>
      <td>389.682 ms</td>
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

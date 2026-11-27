---
title: Benchmarks
published: true
---

## CPU-bound

**Configuration:**
- Ruby 4.0.9, 1 thread/fiber
- Raindeer 1.0.60 with LowType's strip mode, which removes types as classes load
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
      <td>20,571.45</td>
      <td>17,425.18</td>
      <td>18,745.35</td>
      <td>18,859.74</td>
      <td>2.651 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>19,346.93</td>
      <td>18,099.27</td>
      <td>17,711.95</td>
      <td>16,914.99</td>
      <td>2.956 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>17,049.40</td>
      <td>15,659.87</td>
      <td>15,431.04</td>
      <td>15,136.00</td>
      <td>3.303 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>11,033.59</td>
      <td>9,332.01</td>
      <td>7,940.30</td>
      <td>7,084.63</td>
      <td>7.058 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,693.12</td>
      <td>6,661.28</td>
      <td>6,694.91</td>
      <td>6,684.02</td>
      <td>7.481 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,756.65</td>
      <td>2,760.38</td>
      <td>2,739.97</td>
      <td>2,732.74</td>
      <td>18.297 ms</td>
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
      <td>21,692.96</td>
      <td>19,984.43</td>
      <td>19,183.86</td>
      <td>17,197.22</td>
      <td>16,931.06</td>
      <td>2.953 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>19,356.31</td>
      <td>17,808.34</td>
      <td>16,516.46</td>
      <td>15,904.88</td>
      <td>15,064.95</td>
      <td>3.319 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>16,820.25</td>
      <td>15,933.16</td>
      <td>14,841.76</td>
      <td>14,393.95</td>
      <td>13,932.42</td>
      <td>3.589 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>10,922.09</td>
      <td>9,833.31</td>
      <td>9,386.60</td>
      <td>6,536.77</td>
      <td>6,409.12</td>
      <td>7.801 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,840.65</td>
      <td>6,817.94</td>
      <td>6,286.20</td>
      <td>6,274.15</td>
      <td>5,977.25</td>
      <td>8.365 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,757.84</td>
      <td>2,756.15</td>
      <td>2,703.79</td>
      <td>2,700.17</td>
      <td>2,650.13</td>
      <td>18.867 ms</td>
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
      <td>19,131.09</td>
      <td>17,735.81</td>
      <td>17,482.23</td>
      <td>16,924.33</td>
      <td>2.954 ms</td>
    </tr>
    <tr>
      <td><strong>Roda</strong> + Falcon</td>
      <td>20,876.98</td>
      <td>8,700.77</td>
      <td>17,056.16</td>
      <td>17,410.18</td>
      <td>2.872 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>16,564.38</td>
      <td>15,589.56</td>
      <td>15,214.07</td>
      <td>14,810.57</td>
      <td>3.376 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,385.41</td>
      <td>6,788.65</td>
      <td>6,737.77</td>
      <td>6,812.12</td>
      <td>7.340 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>10,460.21</td>
      <td>4,136.21</td>
      <td>1,791.02</td>
      <td>1,698.20</td>
      <td>29.443 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,731.73</td>
      <td>2,717.46</td>
      <td>2,707.59</td>
      <td>2,683.12</td>
      <td>18.635 ms</td>
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
      <td>19,709.25</td>
      <td>17,806.65</td>
      <td>16,747.22</td>
      <td>16,203.84</td>
      <td>15,382.27</td>
      <td>3.250 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>16,933.32</td>
      <td>15,822.95</td>
      <td>14,737.21</td>
      <td>14,322.31</td>
      <td>13,738.07</td>
      <td>3.640 ms</td>
    </tr>
    <tr>
      <td><strong>Roda</strong> + Falcon</td>
      <td>20,781.29</td>
      <td>13,895.20</td>
      <td>13,597.80</td>
      <td>9,891.65</td>
      <td>9,791.73</td>
      <td>5.106 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,802.30</td>
      <td>6,751.44</td>
      <td>6,276.63</td>
      <td>6,229.99</td>
      <td>5,946.48</td>
      <td>8.408 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>10,785.82</td>
      <td>4,244.31</td>
      <td>4,388.23</td>
      <td>1,716.07</td>
      <td>1,712.73</td>
      <td>29.193 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,715.48</td>
      <td>2,718.58</td>
      <td>2,677.91</td>
      <td>2,655.20</td>
      <td>2,623.35</td>
      <td>19.060 ms</td>
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
      <td>17,731.39</td>
      <td>2.820 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>15,329.78</td>
      <td>3.262 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>13,933.34</td>
      <td>3.589 ms</td>
    </tr>
  </tbody>
</table>

<em><sup>*</sup>LowLoop is the default server for Raindeer</em>

**See:** [raindeer-benchmarks](https://github.com/rainpour/raindeer-benchmarks) repo

## IO-bound

Each request to `/slow` waits 50ms, like a database query, then returns a plain string. One request at a time could do 20 requests per second, so the most a server can do is 20 times the number of requests sent at once. Every app has the same 1000 routes as above.

Every server here waits on requests with Ruby's fiber scheduler, so they all reach that limit at 50 at once, and most do at 200. The differences show at 1000 at once, where each server's CPU cost per request starts to count. Rails timed out at 1000 at once: some of its requests waited longer than Apache Bench's 30 second limit, which stops the test.

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
      <td>928.02</td>
      <td>3,668.80</td>
      <td>11,940.33</td>
      <td>83.750 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>937.70</td>
      <td>3,720.49</td>
      <td>11,044.21</td>
      <td>90.545 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>934.81</td>
      <td>3,707.42</td>
      <td>10,336.65</td>
      <td>96.743 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>936.30</td>
      <td>3,668.58</td>
      <td>7,362.98</td>
      <td>135.815 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>914.06</td>
      <td>3,543.84</td>
      <td>4,448.49</td>
      <td>224.796 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>938.15</td>
      <td>2,497.55</td>
      <td>timed out</td>
      <td>timed out</td>
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

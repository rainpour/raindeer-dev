---
title: Benchmarks
published: true
---

## CPU-bound

**Configuration:**
- Ruby 4.0.9, 1 thread/fiber
- Raindeer 1.0.54 with LowType's strip mode, which removes types as classes load
- Each column requests a route at that path depth, the last parent of its group
- Sinatra checks every route one by one in the order they are declared, so its speed depends on where a route sits in the list. The requested routes sit near the end of its list. Roda checks routes one by one too, but only within each branch of its routing tree

> [!NOTE]
> **Requests Per Second:** This CPU-bound metric is a relatively small slice of time in comparison to the typical IO-bound tasks of web applications, such as waiting for the database.

Static routes are nested like REST resources, where a resource has its own route and child routes (`/solo2`, `/solo2/duo5`, `/solo2/duo5/trio3`). Routes with `:id` are REST collections and members (`/solo5`, `/solo5/:id`, `/solo5/:id/duo6`, `/solo5/:id/duo6/:duo_id`).

### 100 routes

40 one segment routes, 30 two segment routes and 30 three segment routes. Each column requests `/solo2`, `/solo2/duo5` and `/solo2/duo5/trio3`.

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
      <td><strong>Rage</strong> + Iodine</td>
      <td>49,360.05</td>
      <td>46,219.80</td>
      <td>44,061.21</td>
      <td>42,121.49</td>
      <td>1.187 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Iodine</td>
      <td>22,974.67</td>
      <td>18,931.99</td>
      <td>16,427.16</td>
      <td>14,363.13</td>
      <td>3.481 ms</td>
    </tr>
    <tr>
      <td><strong>Roda</strong> + Falcon</td>
      <td>20,077.84</td>
      <td>18,556.63</td>
      <td>17,815.32</td>
      <td>17,071.98</td>
      <td>2.929 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>15,838.82</td>
      <td>13,285.81</td>
      <td>11,984.52</td>
      <td>10,873.39</td>
      <td>4.598 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>14,373.89</td>
      <td>12,216.56</td>
      <td>11,245.49</td>
      <td>10,213.09</td>
      <td>4.896 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>9,907.67</td>
      <td>6,034.00</td>
      <td>5,322.36</td>
      <td>5,268.23</td>
      <td>9.491 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,043.46</td>
      <td>5,909.70</td>
      <td>5,932.30</td>
      <td>5,866.50</td>
      <td>8.523 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,435.71</td>
      <td>2,417.00</td>
      <td>2,402.34</td>
      <td>2,378.82</td>
      <td>21.019 ms</td>
    </tr>
  </tbody>
</table>

### 100 routes with :id

20 collections with their members, and 5 of them with 6 child collections and their members. Each column requests `/solo5`, `/solo5/42`, `/solo5/42/duo6` and `/solo5/42/duo6/7`.

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
      <td><strong>Rage</strong> + Iodine</td>
      <td>54,735.74</td>
      <td>50,225.64</td>
      <td>47,257.97</td>
      <td>46,548.87</td>
      <td>44,230.17</td>
      <td>1.130 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Iodine</td>
      <td>22,810.35</td>
      <td>19,109.11</td>
      <td>16,290.29</td>
      <td>14,440.39</td>
      <td>13,049.16</td>
      <td>3.832 ms</td>
    </tr>
    <tr>
      <td><strong>Roda</strong> + Falcon</td>
      <td>21,966.80</td>
      <td>18,513.58</td>
      <td>17,907.48</td>
      <td>17,069.96</td>
      <td>16,705.97</td>
      <td>2.993 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>15,286.03</td>
      <td>13,395.12</td>
      <td>12,137.34</td>
      <td>11,401.12</td>
      <td>10,495.98</td>
      <td>4.764 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>15,182.12</td>
      <td>13,236.76</td>
      <td>12,107.03</td>
      <td>11,041.79</td>
      <td>10,166.98</td>
      <td>4.918 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>11,013.69</td>
      <td>5,968.87</td>
      <td>5,736.29</td>
      <td>5,615.22</td>
      <td>5,460.07</td>
      <td>9.157 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,724.40</td>
      <td>6,602.80</td>
      <td>6,075.17</td>
      <td>5,898.42</td>
      <td>5,689.65</td>
      <td>8.788 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,707.06</td>
      <td>2,640.65</td>
      <td>2,641.26</td>
      <td>2,623.28</td>
      <td>2,588.31</td>
      <td>19.318 ms</td>
    </tr>
  </tbody>
</table>

### 1000 routes

400 one segment routes, 300 two segment routes and 300 three segment routes. Each column requests `/solo10`, `/solo10/duo10` and `/solo10/duo10/trio3`.

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
      <td><strong>Rage</strong> + Iodine</td>
      <td>47,714.25</td>
      <td>45,987.90</td>
      <td>41,622.27</td>
      <td>40,127.12</td>
      <td>1.246 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Iodine</td>
      <td>21,569.16</td>
      <td>18,266.99</td>
      <td>15,587.97</td>
      <td>13,579.50</td>
      <td>3.682 ms</td>
    </tr>
    <tr>
      <td><strong>Roda</strong> + Falcon</td>
      <td>19,929.65</td>
      <td>18,041.67</td>
      <td>16,480.61</td>
      <td>16,175.77</td>
      <td>3.091 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>16,768.75</td>
      <td>13,888.70</td>
      <td>12,465.39</td>
      <td>10,989.19</td>
      <td>4.550 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>13,941.14</td>
      <td>11,861.20</td>
      <td>10,778.81</td>
      <td>9,223.00</td>
      <td>5.421 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>10,372.56</td>
      <td>1,173.15</td>
      <td>1,183.15</td>
      <td>1,193.74</td>
      <td>41.885 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,575.95</td>
      <td>6,648.81</td>
      <td>6,690.87</td>
      <td>6,650.39</td>
      <td>7.518 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,740.56</td>
      <td>2,732.52</td>
      <td>2,726.82</td>
      <td>2,719.17</td>
      <td>18.388 ms</td>
    </tr>
  </tbody>
</table>

### 1000 routes with :id

200 collections with their members, and 10 of them with 30 child collections and their members. Each column requests `/solo10`, `/solo10/42`, `/solo10/42/duo30` and `/solo10/42/duo30/7`.

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
      <td><strong>Rage</strong> + Iodine</td>
      <td>50,044.79</td>
      <td>48,111.73</td>
      <td>44,895.09</td>
      <td>40,572.15</td>
      <td>39,312.81</td>
      <td>1.272 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Iodine</td>
      <td>22,844.04</td>
      <td>18,539.27</td>
      <td>15,782.64</td>
      <td>13,386.41</td>
      <td>12,355.45</td>
      <td>4.047 ms</td>
    </tr>
    <tr>
      <td><strong>Roda</strong> + Falcon</td>
      <td>20,446.78</td>
      <td>10,304.05</td>
      <td>9,957.76</td>
      <td>9,126.49</td>
      <td>9,248.14</td>
      <td>5.406 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>15,371.34</td>
      <td>12,328.07</td>
      <td>11,948.92</td>
      <td>10,640.31</td>
      <td>10,025.60</td>
      <td>4.987 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>15,014.61</td>
      <td>7,146.65</td>
      <td>8,365.83</td>
      <td>9,648.73</td>
      <td>9,037.01</td>
      <td>5.533 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>10,076.96</td>
      <td>1,112.69</td>
      <td>1,202.30</td>
      <td>1,157.13</td>
      <td>1,164.82</td>
      <td>42.925 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,089.58</td>
      <td>6,085.95</td>
      <td>5,656.27</td>
      <td>5,679.59</td>
      <td>5,440.28</td>
      <td>9.191 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,707.45</td>
      <td>2,685.62</td>
      <td>2,641.94</td>
      <td>2,614.85</td>
      <td>2,580.11</td>
      <td>19.379 ms</td>
    </tr>
  </tbody>
</table>

<em><sup>*</sup>LowLoop is the default server for Raindeer</em>

**See:** [raindeer-benchmarks](https://github.com/rainpour/raindeer-benchmarks) repo

## IO-bound

Routing becomes a much less share of the time when it comes to IO, so we'll just benchmark with many routes.

### 100 routes

## Integrations

These integrations are experimental and don't suport the full Raindeer API such as `Interval` yet.

### Falcon

### Iodine

If you really need CPU-bound speed then you can boot Raindeer via Iodine. Compared to LowLoop, this currently increases requests per second by **~24-45%** and decreases latency by **~20%**. It involves a Rack adapter (for now) and of course, the absence of LowLoop with its Matrix, Interval and Async related features.

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

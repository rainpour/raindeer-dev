---
title: Benchmarks
published: true
---

## CPU-bound

**Configuration:**
- Ruby 4.0.9, 1 thread/fiber
- One route table nested like real REST resources, where a resource has its own route and child routes (`/solo2`, `/solo2/duo5`, `/solo2/duo5/trio3`)
- Each column requests a route at that path depth, the last parent of its group
- Sinatra checks every route one by one in the order they are declared, so its speed depends on where a route sits in the list. The requested routes sit near the end of its list. Roda checks routes one by one too, but only within each branch of its routing tree

> [!NOTE]
> **Requests Per Second:** This CPU-bound metric is a relatively small slice of time in comparison to the typical IO-bound tasks of web applications, such as waiting for the database.

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
      <td>50,134.23</td>
      <td>47,947.95</td>
      <td>44,107.07</td>
      <td>43,342.30</td>
      <td>1.154 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Iodine</td>
      <td>21,548.24</td>
      <td>14,916.99</td>
      <td>11,840.96</td>
      <td>9,505.24</td>
      <td>5.260 ms</td>
    </tr>
    <tr>
      <td><strong>Roda</strong> + Falcon</td>
      <td>20,565.21</td>
      <td>18,966.59</td>
      <td>17,875.67</td>
      <td>16,952.92</td>
      <td>2.949 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>15,701.08</td>
      <td>11,881.45</td>
      <td>10,173.65</td>
      <td>8,581.76</td>
      <td>5.826 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>13,372.04</td>
      <td>10,424.82</td>
      <td>8,764.67</td>
      <td>7,380.85</td>
      <td>6.774 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>9,603.09</td>
      <td>5,792.37</td>
      <td>5,064.20</td>
      <td>4,941.78</td>
      <td>10.118 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>6,080.98</td>
      <td>5,897.77</td>
      <td>5,749.41</td>
      <td>5,584.84</td>
      <td>8.953 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,436.48</td>
      <td>2,402.14</td>
      <td>2,369.73</td>
      <td>2,399.90</td>
      <td>20.834 ms</td>
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
      <td>50,321.81</td>
      <td>45,545.22</td>
      <td>43,555.62</td>
      <td>41,354.27</td>
      <td>1.209 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Iodine</td>
      <td>20,257.43</td>
      <td>12,510.33</td>
      <td>9,342.90</td>
      <td>7,769.80</td>
      <td>6.435 ms</td>
    </tr>
    <tr>
      <td><strong>Roda</strong> + Falcon</td>
      <td>20,161.80</td>
      <td>17,541.40</td>
      <td>16,117.61</td>
      <td>15,366.02</td>
      <td>3.254 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + LowLoop</td>
      <td>15,051.25</td>
      <td>10,679.49</td>
      <td>8,334.24</td>
      <td>7,066.29</td>
      <td>7.076 ms</td>
    </tr>
    <tr>
      <td><strong>Raindeer</strong> + Falcon</td>
      <td>13,080.80</td>
      <td>9,168.16</td>
      <td>7,132.06</td>
      <td>6,356.69</td>
      <td>7.866 ms</td>
    </tr>
    <tr>
      <td><strong>Sinatra</strong> + Falcon</td>
      <td>9,994.79</td>
      <td>1,024.05</td>
      <td>1,047.99</td>
      <td>1,047.51</td>
      <td>47.732 ms</td>
    </tr>
    <tr>
      <td><strong>Hanami</strong> + Falcon</td>
      <td>5,950.64</td>
      <td>5,880.88</td>
      <td>5,921.52</td>
      <td>5,921.80</td>
      <td>8.443 ms</td>
    </tr>
    <tr>
      <td><strong>Rails</strong> + Falcon</td>
      <td>2,327.12</td>
      <td>2,409.83</td>
      <td>2,373.50</td>
      <td>2,361.94</td>
      <td>21.169 ms</td>
    </tr>
  </tbody>
</table>

<em><sup>*</sup>LowLoop is the default server for Raindeer</em>

**See:** [raindeer-benchmarks](https://github.com/raindeer-rb/raindeer-benchmarks) repo

## IO-bound

Routing becomes a much less share of the time when it comes to IO, so we'll just benchmark with many routes.

### 100 routes

## Integrations

These integrations are experimental and don't suport the full Raindeer API such as `Interval` yet.

### Falcon

### Iodine

If you really need CPU-bound speed then you can boot Raindeer via Iodine. Compared to LowLoop, this currently increases requests per second by **~10-37%** and decreases latency by **~9%**. It involves a Rack adapter (for now) and of course, the absence of LowLoop with its Matrix, Interval and Async related features.

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

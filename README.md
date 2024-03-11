# K6-pt
```
install nodejs
install k6 (#reboot require)
install vscode
npm install

```Run K6 with these command and collect report in Terminal```
k6 run -e VU=10 -e IT=10 projects\sample\features\k6-sample-flow.js
k6 run -e RAMPUP=180s -e VU=500 projects\sample\features\k6-sample-flow.js
k6 run -e RAMPUP=180s -e VU=500 projects\sample\features\pt-types-flow.js
k6 run -e RAMPUP=180s -e VU=500 projects\sample\features\redirect-flow.js
```
Report can be export to available types: cloud, csv, experimental-prometheus-rw, influxdb, json, statsd, web-dashboard

![screenshot](https://github.com/singavn/k6-sample/blob/main/utils/output1.JPG)

Sample: Export report to InfluxDB server:
![sample](https://k6.io/docs/static/45acb233dd7b23084d02d77658b0865d/3c65a/influxdb-data-explorer-k6-bucket.png)

# K6-pt
```
install nodejs
install k6 (#reboot require)
install vscode
npm install

k6 run -e VU=10 -e IT=10 projects\sample\features\k6-sample-flow.js
k6 run -e RAMPUP=180s -e VU=500 projects\sample\features\k6-sample-flow.js
k6 run -e RAMPUP=180s -e VU=500 projects\sample\features\pt-types-flow.js
k6 run -e RAMPUP=180s -e VU=500 projects\sample\features\redirect-flow.js

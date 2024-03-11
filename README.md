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

![image]([https://github.com/singavn/k6-sample/assets/135845198/3271d037-4a87-44fb-87f3-c5d020316224](https://github.com/singavn/k6-sample/blob/main/utils/output1.JPG))

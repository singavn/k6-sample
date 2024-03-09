import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
    insecureSkipTLSVerify: true,

    vus: __ENV.VU,
    iterations: __ENV.IT,

    //================================================================

    //smoke test
    // stages: [
    //     { target: 3, duration: '10s' },
    // ],

    //================================================================

    //load test
    // stages: [
    //     { duration: '10s', target: 10 },
    //     { duration: '30s', target: 10 },
    //     { duration: '1m', target: 0 },
    // ],

    //================================================================

    //stress test
    // stages: [
    //     { duration: '1s', target: 1 },
    //     { duration: '2s', target: 2 },
    //     { duration: '4s', target: 4 },
    //     { duration: '8s', target: 8 },
    //     // { duration: '16s', target: 16 },
    //     // { duration: '32s', target: 32 },
    //     // { duration: '64s', target: 64 },
    //     { duration: '32s', target: 0 },
    // ],

    //================================================================

    //spike test
    // stages: [
    //     { duration: '10s', target: 100 },
    //     { duration: '1m', target: 100 },
    //     { duration: '10s', target: 3000 },
    //     { duration: '3m', target: 3000 },
    //     { duration: '10s', target: 100 },
    //     { duration: '3m', target: 100 },
    //     { duration: '10s', target: 0 },
    // ],

    //================================================================

    //soak test
    // stages: [
    //     { duration: '10s', target: 10 },
    //     { duration: '60s', target: 10 },
    //     { duration: '10s', target: 0 },
    // ],

    //================================================================

    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<10000'],
        'http_reqs{api:get}': ['count<100'],
    },
};

//k6 run --out influxdb=http://$SERVER:8086/k6 -e VU=100 -e RAMPUP=20s sample.js
//k6 run --out influxdb=http://%SERVER:8086/k6 -e VU=100 -e RAMPUP=20s sample.js

export default function () {
    console.log(`start VU ${__VU}`);

    const url = 'http://r.srvtrck.com/v1/redirect?url=http://www.amazon.de/gp/product/B003VWJQ1S&type=url&api_key=635666fa72ddf39eadbf04183e2bf80d&site_id=4d4984efe3f5a25a4b98ac6a&source=http://www.my-domain.com'

    //const url = 'https://www.amazon.de/gp/product/B003VWJQ1S&type=url&api_key=635666fa72ddf39eadbf04183e2bf80d&site_id=4d4984efe3f5a25a4b98ac6a&source=http://www.my-domain.com'

    //const url = 'https://google.com'

    const params = {
        headers: {
            //'Content-Type': 'application/json'
            //Authorization: token
        },
        tags: { api: 'get' }
    };

    const res = http.get(url, params);

    console.log(`start VU ${__VU} res status = ${res.status}`);
    console.log(`start VU ${__VU} res body = ${res.body}`);

    const checkRes = check(res, {
        'status is 200': (r) => r.status === 200,
    });
}

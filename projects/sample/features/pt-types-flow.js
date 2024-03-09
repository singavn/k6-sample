import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
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
    },
};

export default function () {
    console.log(`start VU ${__VU}`);

    const res = http.get('http://test.k6.io');

    sleep(1);

    const checkRes = check(res, {
        'status is 200': (r) => r.status === 200,
    });
}

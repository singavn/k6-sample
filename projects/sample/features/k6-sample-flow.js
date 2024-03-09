import http from 'k6/http';
import { check, group } from 'k6';
import { SharedArray } from 'k6/data';

import { randomString, uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';

// import { randomString, randomIntBetween, uuidv4 } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
// import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';
// import papaparse from '../../../libs/papaparse/5.1.1/index.js';
// import { htmlReport } from "../../../libs/k6-reporter/1.0/bundle.js";
// import { textSummary } from "../../../libs/k6-summary/0.0.1/index.js";

console.log(uuidv4());

//===========jsonData===========
const jsonFile = open(`../data/data.json`);

const jsonData = new SharedArray('some data name', function () {
    const data = JSON.parse(jsonFile);
    return data;
});
//=============================

//===========csvData===========
const csvFile = open(`../data/data.csv`);

const csvData = new SharedArray('prepare data', function () {
    const data = papaparse.parse(csvFile, { header: true }).data;
    return data;
});
//=============================

export function setup() {
    console.log("============= setup =============");
    console.log("csvData = ", csvData);
    const jsonData = JSON.stringify(csvData);
    return jsonData;
}

// export function setup() {
//     console.log("============= setup =============");
//     const results = papaparse.parse(csvFile, { header: true });
//     expect(results.data.length, 'setup csv data').not.to.equal(0);
//     return results.data;
// }



export let options = {
    vus: __ENV.VU,
    iterations: __ENV.IT,

    // stages: [
    //     { duration: __ENV.RAMPUP, target: __ENV.VU },
    //     //{ target: 15, duration: '1m' },
    //     //{ target: 0, duration: '1m' },
    // ],

    //==============================

    //smoke test
    // stages: [
    //     { target: 3, duration: '10s' },
    // ],

    //================================================================ 

    //load test
    // stages: [
    //     { duration: '5m', target: 100 },
    //     { duration: '10m', target: 100 },
    //     { duration: '5m', target: 0 },
    // ],

    //================================================================

    //stress test
    // stages: [
    //     { duration: '2m', target: 100 },
    //     { duration: '5m', target: 100 },
    //     { duration: '2m', target: 300 },
    //     { duration: '5m', target: 300 },
    //     { duration: '2m', target: 500 },
    //     { duration: '5m', target: 500 },
    //     { duration: '2m', target: 700 },
    //     { duration: '5m', target: 700 },
    //     { duration: '10m', target: 0 },
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
    //     { duration: '2m', target: 400 },
    //     { duration: '3h56m', target: 400 },
    //     { duration: '2m', target: 0 },
    // ],

    //================================================================

    thresholds: {
        'http_req_duration{flow:register&login}': ['p(95)<10000', 'p(99)<10000', 'avg<10000', 'max<10000'],
        'http_req_duration{type:maincase}': ['p(95)<10000', 'p(99)<10000', 'avg<10000', 'max<10000'],

        'http_req_duration{api:register}': ['p(95)<10000', 'p(99)<10000', 'avg<10000', 'max<10000'],
        'http_req_duration{api:login}': ['p(95)<10000', 'p(99)<10000', 'avg<10000', 'max<10000'],
        'http_req_duration{api:create}': ['p(95)<10000', 'p(99)<10000', 'avg<10000', 'max<10000'],
        'http_req_duration{api:get}': ['p(95)<10000', 'p(99)<10000', 'avg<10000', 'max<10000'],

        'http_reqs{api:register}': ['count<100'],

        'http_req_duration{group:::register&login}': ['p(95)<10000', 'p(99)<10000', 'avg<10000', 'max<10000'],
        'http_req_duration{group:::create&get}': ['p(95)<10000', 'p(99)<10000', 'avg<10000', 'max<10000'],

        'group_duration{group:::register&login}': ['p(95)<10000', 'p(99)<10000', 'avg<10000', 'max<10000'],
        'group_duration{group:::create&get}': ['p(95)<10000', 'p(99)<10000', 'avg<10000', 'max<10000'],
    }
};

export default function (dataJson) {
    console.log(`============= execute VU ${__VU - 1} =============`);

    console.log(`VU ${__VU}: dataJson type = `, typeof(dataJson));
    console.log(`VU ${__VU}: dataJson = `, dataJson);

    console.log(`VU ${__VU}: csvData type = `, typeof(csvData));
    console.log(`VU ${__VU}: csvData = `, csvData);

    console.log(`VU ${__VU}: jsonData type = `, typeof(jsonData));
    console.log(`VU ${__VU}: jsonData = `, jsonData);

    const dataObject = JSON.parse(dataJson);
    console.log(`VU ${__VU}: dataObject type = `, typeof(dataObject));
    console.log(`VU ${__VU}: dataObject = `, dataObject);
    console.log(`VU ${__VU}: dataObject password = `, dataObject[0].password);

    let user = csvData[0];
    console.log(`VU ${__VU}: user password = `, user.password);
    
    user = jsonData[0];
    console.log(`VU ${__VU}: user password = `, user.password);

    const username = "username_" + randomString(8);
    const crocname = "crocname_" + randomString(8);

    console.log(`VU ${__VU}: username = ${username}`);
    console.log(`VU ${__VU}: crocname = ${crocname}`);

    let token;

    group('register&login', () => {
        let url = 'https://test-api.k6.io/user/register/'

        let params = {
            headers: {
                'Content-Type': 'application/json'
            },
            tags: { api: 'register', flow: 'register&login', type: 'maincase' }
        };

        let body = {
            "username": username,
            "password": user.password,
            "first_name": user.first_name,
            "last_name": user.last_name
        }

        console.log("body = ", body);
        console.log("body type = ", typeof(JSON.stringify(body)));
        // console.log("url = ", url);

        let res = http.post(url, JSON.stringify(body), params);

        let resBody = JSON.parse(res.body);
        console.log(`VU ${__VU}: resbody = `, resBody);

        check(res, {
            'Test case 1 - http response status code is 201': res.status === 201,
            'Test case 2 - return username': resBody.username === username,
        });

        url = 'https://test-api.k6.io/auth/token/login/'

        params = {
            headers: {
                //'Content-Type': 'application/json'
            },
            tags: { api: 'login', flow: 'register&login', type: 'maincase' }
        };

        body = {
            "username": username,
            "password": "superCroc2019"
        }

        // console.log("body = ", body);
        // console.log("url = ", url);

        res = http.post(url, body, params);


        resBody = JSON.parse(res.body);
        console.log(`VU ${__VU}: resbody = `, resBody);
        token = "Bearer " + resBody.access;
        //console.log("token = ", token);

        check(res, {
            'Test case 3 - http response status code is 200': res.status === 200,

            //'return token': res.body.includes('access'),
            'Test case 4 - return token': resBody.access.length > 0,
        });
    })

    group('create&get', () => {
        let url = 'https://test-api.k6.io/my/crocodiles/'

        let params = {
            headers: {
                //'Content-Type': 'application/json'
                Authorization: token
            },
            tags: { api: 'create', type: 'maincase' }
        };

        let body = {
            "name": crocname,
            "sex": "M",
            "date_of_birth": "2022-07-12"
        }

        // console.log("body = ", body);
        // console.log("url = ", url);

        let res = http.post(url, body, params);

        let resBody = JSON.parse(res.body);
        console.log(`VU ${__VU}: resbody = `, resBody);

        check(res, {
            'Test case 5 - http response status code is 201': res.status === 201,
            'Test case 6 - return resource id': resBody.id > 0,
            'Test case 7 - return croc name': resBody.name === crocname,
            //'return croc name': res.body.includes(crocname),
        });

        url = 'https://test-api.k6.io/my/crocodiles/'

        params = {
            headers: {
                //'Content-Type': 'application/json'
                Authorization: token
            },
            tags: { api: 'get' }
        };

        res = http.get(url, params);

        resBody = JSON.parse(res.body);
        console.log(`VU ${__VU}: resbody = `, resBody);

        check(res, {
            'Test case 8 - http response status code is 200': res.status === 200,
            'Test case 9 - return croc name': resBody[0].name === crocname,
            //'return croc name': res.body.includes(crocname),
        });
    })
}

//4.teardown code
export function teardown(dataJson) {
    console.log("============= tearDown =============");
    console.log("tear down, dataJson = ", dataJson);
}

//5.handle summary code
export function handleSummary(data) {
    return {
        "result.html": htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}

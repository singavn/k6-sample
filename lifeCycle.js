// 1. init code

export function setup() {
    // 2. setup code
    console.log(`setup`);
    const data = { "version": "1.0" };
    return data;
}

export default function (data) {
    // 3. VU code
    console.log(`VU ${__VU}: data = ${JSON.stringify(data)}`);
}

export function teardown(data) {
    // 4. teardown code
    console.log(`teardown data = ${JSON.stringify(data)}`);
}

export function handleSummary(data) {
    //5.handle summary code
    console.log(`handleSummary data = ${JSON.stringify(data)}`);
}

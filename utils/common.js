export default class Common {
    constructor() {
    }

    getCsvRow(data, n) {
        return data[n];
    }
    
    getCsvRows(data, n) {
        let partSize = Math.floor(data.length / n);
        return data.slice(partSize * __VU, partSize * __VU + partSize);
    }

    logCookie(cookie) {
        console.log(
            `${cookie.name}: ${cookie.value}\n\tdomain: ${cookie.domain}\n\tpath: ${cookie.path}\n\texpires: ${cookie.expires}\n\thttpOnly: ${cookie.http_only}`
        );
    }
}

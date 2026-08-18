const https = require('https');

const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Im5RYkhGa21OTjhmMmhwbHROXzRHSUVuNnBMNGtObVVmTHNhc2I1aXNLdWsiLCJ0eXAiOiJhdCtqd3QifQ.eyJjbGllbnRfaWQiOiIzZTk5NGYyZi02YzU4LTQyNTUtODNhMy0xNDNjNGUzMDU3ZjQiLCJzY29wZSI6Im1jcCIsImlzcyI6Imh0dHBzOi8vbWNwLm1vdGlvbi5zbyIsInN1YiI6ImUyMTgyYmFjLTY5NDEtNDdmMy1iNDEwLTcxZDg4ZDc0YmVkNiIsImF1ZCI6Imh0dHBzOi8vbWNwLm1vdGlvbi5zby9tY3AiLCJpYXQiOjE3ODcwNzA1NTQsImV4cCI6MTc4NzA3MTE1NCwianRpIjoiZWM3NzQxODMtNDAyOC00NzU1LWJjMjMtNWNjYjQ0MmExZTc0In0.R2y9QTb2fjX9pKhOGNQhp_GCECQ623xcIAuMa58sw7JUtEKdhXodhdvjVTu8TNrCNz1R3JwunTPscP8bov1oozjxj2ijqtcWXHnqO54ApgrArpprpw6xnVptMWg2ki7npsCizi2f7rBDgJQtV50bYLHdWcJfMSikbzQXTMYHN2ySaJcQUt44ZVDNaMQnF2ZAcSzDvb2zA6OozcN0JctRL9D_gryPsRw7-xquoxWQHt3QVhvopYE2N4f8pv9uyuRO3DuV_H5cnzoeLlzPXZ8Wer1Nl2yVm2ETvHBlcpCT00b5UF3zquonnRF0FlZS549ba4kdfzQIXgXRZEVSVkh9ew";

function postJSON(url, bodyObject) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(url);
        const bodyStr = JSON.stringify(bodyObject);
        const options = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
            path: parsedUrl.pathname + parsedUrl.search,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(bodyStr)
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    body: body
                });
            });
        });

        req.on('error', (err) => reject(err));
        req.write(bodyStr);
        req.end();
    });
}

async function run() {
    try {
        console.log("Directly posting tools/list to https://mcp.motion.so/mcp ...");
        const response = await postJSON("https://mcp.motion.so/mcp", {
            jsonrpc: "2.0",
            method: "tools/list",
            params: {},
            id: 1
        });

        console.log("Response Status:", response.statusCode);
        console.log("Response Body:\n", response.body);

    } catch (err) {
        console.error("Error posting to MCP:", err.message);
    }
}

run();

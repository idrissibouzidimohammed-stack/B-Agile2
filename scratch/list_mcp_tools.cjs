const https = require('https');

const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Im5RYkhGa21OTjhmMmhwbHROXzRHSUVuNnBMNGtObVVmTHNhc2I1aXNLdWsiLCJ0eXAiOiJhdCtqd3QifQ.eyJjbGllbnRfaWQiOiIzZTk5NGYyZi02YzU4LTQyNTUtODNhMy0xNDNjNGUzMDU3ZjQiLCJzY29wZSI6Im1jcCIsImlzcyI6Imh0dHBzOi8vbWNwLm1vdGlvbi5zbyIsInN1YiI6ImUyMTgyYmFjLTY5NDEtNDdmMy1iNDEwLTcxZDg4ZDc0YmVkNiIsImF1ZCI6Imh0dHBzOi8vbWNwLm1vdGlvbi5zby9tY3AiLCJpYXQiOjE3ODcwNzA1NTQsImV4cCI6MTc4NzA3MTE1NCwianRpIjoiZWM3NzQxODMtNDAyOC00NzU1LWJjMjMtNWNjYjQ0MmExZTc0In0.R2y9QTb2fjX9pKhOGNQhp_GCECQ623xcIAuMa58sw7JUtEKdhXodhdvjVTu8TNrCNz1R3JwunTPscP8bov1oozjxj2ijqtcWXHnqO54ApgrArpprpw6xnVptMWg2ki7npsCizi2f7rBDgJQtV50bYLHdWcJfMSikbzQXTMYHN2ySaJcQUt44ZVDNaMQnF2ZAcSzDvb2zA6OozcN0JctRL9D_gryPsRw7-xquoxWQHt3QVhvopYE2N4f8pv9uyuRO3DuV_H5cnzoeLlzPXZ8Wer1Nl2yVm2ETvHBlcpCT00b5UF3zquonnRF0FlZS549ba4kdfzQIXgXRZEVSVkh9ew";

function connectSSE(url) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(url);
        const options = {
            hostname: parsedUrl.hostname,
            path: parsedUrl.pathname + parsedUrl.search,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'text/event-stream'
            }
        };

        const req = https.request(options, (res) => {
            console.log("SSE Response status:", res.statusCode);
            console.log("SSE Response headers:", res.headers);
            
            res.on('data', (chunk) => {
                console.log("SSE Data Chunk:\n", chunk.toString());
            });

            res.on('end', () => {
                console.log("SSE Connection Closed.");
                resolve();
            });
        });

        req.on('error', (err) => reject(err));
        req.end();
    });
}

connectSSE("https://mcp.motion.so/mcp");

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
            let buffer = '';
            let postEndpoint = '';

            res.on('data', (chunk) => {
                buffer += chunk.toString();
                const lines = buffer.split('\n');
                buffer = lines.pop();

                for (const line of lines) {
                    if (line.startsWith('data:')) {
                        const dataContent = line.slice(5).trim();
                        if (dataContent.startsWith('http://') || dataContent.startsWith('https://') || dataContent.startsWith('/')) {
                            postEndpoint = dataContent;
                            req.destroy();
                            resolve(postEndpoint);
                            return;
                        }
                    }
                }
            });

            res.on('end', () => {
                if (!postEndpoint) {
                    reject(new Error("SSE connection closed without receiving endpoint."));
                }
            });
        });

        req.on('error', (err) => reject(err));
        req.end();
    });
}

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
        console.log("Connecting to SSE to get POST endpoint...");
        const sseUrl = "https://mcp.motion.so/mcp";
        const postEndpoint = await connectSSE(sseUrl);
        
        let fullPostUrl = postEndpoint;
        if (postEndpoint.startsWith('/')) {
            const parsedSse = new URL(sseUrl);
            fullPostUrl = `${parsedSse.protocol}//${parsedSse.host}${postEndpoint}`;
        }
        console.log(`Discovered HTTP POST Endpoint: ${fullPostUrl}`);

        console.log("\nStep 1: Requesting video generation from Motion MCP...");
        const prompt = "An abstract, futuristic 3D glowing neon letter 'B' floating in a dark slate void. A sleek, glowing violet progress loader ring spins smoothly around it, pulsating with light energy particles. Liquid glassmorphism refraction, high-end motion design, premium dark mode aesthetic, 4k resolution, loops seamlessly.";
        
        const generateResponse = await postJSON(fullPostUrl, {
            jsonrpc: "2.0",
            method: "tools/call",
            params: {
                name: "create_video",
                arguments: {
                    prompt: prompt,
                    aspect_ratio: "16:9",
                    duration: "<10s"
                }
            },
            id: 2
        });

        if (generateResponse.statusCode !== 200) {
            throw new Error(`Tool call failed (Status: ${generateResponse.statusCode}): ${generateResponse.body}`);
        }

        const genResult = JSON.parse(generateResponse.body);
        if (genResult.error) {
            throw new Error(`RPC Error: ${JSON.stringify(genResult.error)}`);
        }

        const content = genResult.result.content;
        const jsonContentText = content.find(c => c.type === 'text')?.text;
        if (!jsonContentText) {
            throw new Error(`No text content found in result: ${JSON.stringify(genResult.result)}`);
        }

        console.log("Generation started!");
        const sessionInfo = JSON.parse(jsonContentText);
        const sessionId = sessionInfo.session_id || sessionInfo.id;
        console.log(`Session ID: ${sessionId}`);

        console.log("\nStep 2: Polling job status until completed...");
        while (true) {
            await new Promise(resolve => setTimeout(resolve, 8000)); // wait 8s between polls
            
            const statusResponse = await postJSON(fullPostUrl, {
                jsonrpc: "2.0",
                method: "tools/call",
                params: {
                    name: "get_session_status",
                    arguments: {
                        session_id: sessionId
                    }
                },
                id: 3
            });

            if (statusResponse.statusCode !== 200) {
                console.log(`[Error status: ${statusResponse.statusCode}], retrying...`);
                continue;
            }

            const statusResult = JSON.parse(statusResponse.body);
            if (statusResult.error) {
                console.log("RPC Error polling:", JSON.stringify(statusResult.error));
                continue;
            }

            const statusText = statusResult.result.content.find(c => c.type === 'text')?.text;
            if (!statusText) continue;

            const jobInfo = JSON.parse(statusText);
            const status = jobInfo.status;
            console.log(`Current Job Status: ${status}`);

            if (status === "completed") {
                console.log("\n=======================================================");
                console.log("SUCCESS! Video generated successfully!");
                console.log(`Download URL: ${jobInfo.output.download_url}`);
                console.log("=======================================================");
                break;
            } else if (status === "failed") {
                throw new Error(`Video generation failed: ${jobInfo.error_message || 'Unknown error'}`);
            }
        }

    } catch (err) {
        console.error("\nError during video generation:", err.message);
    }
}

run();

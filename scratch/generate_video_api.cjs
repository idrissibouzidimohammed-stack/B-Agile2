const https = require('https');

const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Im5RYkhGa21OTjhmMmhwbHROXzRHSUVuNnBMNGtObVVmTHNhc2I1aXNLdWsiLCJ0eXAiOiJhdCtqd3QifQ.eyJjbGllbnRfaWQiOiJhNmYzMTgxNS03ZTJjLTQ4NTctYWM3My03ZWJhOWZlYmZjN2UiLCJzY29wZSI6Im1jcCBtb3Rpb246c2Vzc2lvbnM6d3JpdGUgbW90aW9uOnNlc3Npb25zOnJlYWQiLCJpc3MiOiJodHRwczovL21jcC5tb3Rpb24uc28iLCJzdWIiOiJlMjE4MmJhYy02OTQxLTQ3ZjMtYjQxMC03MWQ4OGQ3NGJlZDYiLCJhdWQiOiJodHRwczovL21jcC5tb3Rpb24uc28vbWNwIiwiaWF0IjoxNzg3MDcxNDQ3LCJleHAiOjE3ODcwNzIwNDcsImp0aSI6IjllOThjZWMwLTBhYTQtNDg2MS1iNjE0LTliN2YxMjczNTJlMyJ9.cNg942lyl7VwkhB0H_sEKGAHTn8B-6nqTtE-umgtmKelnf5tOIs4RUh9E70PArQ85e0ul09vexOGjZzkAeB9LYiL1ebT5NNHDAetHyoJy61xkew2QE6aXUjPE-iujI06Zl3VshkS82-GEbLu0vWZlf-VpUJGr2p3wOzhn63oXJJ-NJ0rk89YxUhKzW8tWHNOwHb7-AUvyO0bN1P8Uqdo6Id15GNG49nJJ6kVgqK8a0SvUDGH6TqyLCZc4qrkEBaOF3K4MPjWr7LXThnIvK-AxU7tJyaNhonxgKGUMn87JiHbKT0VrRXXra64P9js-PxE9BkVhJfGHi05BBZ1WFqcRA";

function requestJSON(url, method, bodyObject) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(url);
        const bodyStr = bodyObject ? JSON.stringify(bodyObject) : '';
        const options = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
            path: parsedUrl.pathname + parsedUrl.search,
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };

        if (bodyStr) {
            options.headers['Content-Length'] = Buffer.byteLength(bodyStr);
        }

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
        if (bodyStr) {
            req.write(bodyStr);
        }
        req.end();
    });
}

async function run() {
    try {
        console.log("Step 1: Sending POST request to create video session...");
        const payload = {
            prompt: "A premium, loopable loading screen video. It features a futuristic, glowing 3D metallic letter 'B' floating inside a dark violet glassmorphic vortex. A glowing neon fuchsia progress loading circle spins smoothly around the 'B', emitting particles of violet starlight. Clean, professional motion design, dark theme, vercel style.",
            aspect_ratio: "16:9",
            duration: "<10s",
            design_system_id: "vercel"
        };

        const postRes = await requestJSON("https://api.motion.so/api/motion/sessions", "POST", payload);
        console.log("POST Status Code:", postRes.statusCode);
        console.log("POST Response Body:", postRes.body);

        if (postRes.statusCode < 200 || postRes.statusCode >= 300) {
            throw new Error(`Session creation failed: ${postRes.body}`);
        }

        const jobInfo = JSON.parse(postRes.body);
        const jobId = jobInfo.job_id;
        console.log(`Job Created Successfully! Job ID: ${jobId}`);

        console.log("\nStep 2: Polling job status...");
        const pollUrl = `https://api.motion.so/api/motion/sessions/${jobId}`;
        
        while (true) {
            await new Promise(resolve => setTimeout(resolve, 6000));
            const pollRes = await requestJSON(pollUrl, "GET", null);
            
            if (pollRes.statusCode !== 200) {
                console.log(`Poll error (Status: ${pollRes.statusCode}), retrying...`);
                continue;
            }

            const pollInfo = JSON.parse(pollRes.body);
            console.log(`Job Status: ${pollInfo.status}`);

            if (pollInfo.status === "completed" && pollInfo.output && pollInfo.output.download_url) {
                console.log("\n=======================================================");
                console.log("SUCCESS! Loading video generated successfully!");
                console.log(`Download URL: ${pollInfo.output.download_url}`);
                console.log("=======================================================");
                break;
            } else if (pollInfo.status === "failed") {
                throw new Error(`Job failed: ${pollInfo.error || 'Unknown error'}`);
            }
        }

    } catch (err) {
        console.error("\nError generating loading video:", err.message);
    }
}

run();

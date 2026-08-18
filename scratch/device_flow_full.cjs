const https = require('https');

function request(url, method, headers, data) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(url);
        const options = {
            hostname: parsedUrl.hostname,
            path: parsedUrl.pathname + parsedUrl.search,
            method: method,
            headers: headers
        };
        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: body
                });
            });
        });
        req.on('error', (err) => reject(err));
        if (data) {
            req.write(data);
        }
        req.end();
    });
}

async function run() {
    try {
        console.log("Step 1: Registering dynamic client with full scopes...");
        const registerBody = JSON.stringify({
            client_name: "Antigravity Full Agent CLI",
            grant_types: ["urn:ietf:params:oauth:grant-type:device_code"],
            token_endpoint_auth_method: "none",
            scope: "mcp motion:sessions:write motion:sessions:read"
        });
        const registerRes = await request(
            "https://mcp.motion.so/oauth/register",
            "POST",
            {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(registerBody)
            },
            registerBody
        );

        if (registerRes.statusCode < 200 || registerRes.statusCode >= 300) {
            throw new Error(`DCR Failed (Status: ${registerRes.statusCode}): ${registerRes.body}`);
        }

        const clientInfo = JSON.parse(registerRes.body);
        const clientId = clientInfo.client_id;
        console.log(`Client Registered! Client ID: ${clientId}`);

        console.log("Step 2: Initiating Device Authorization Flow...");
        const authData = `client_id=${encodeURIComponent(clientId)}&scope=${encodeURIComponent("mcp motion:sessions:write motion:sessions:read")}`;
        const authRes = await request(
            "https://mcp.motion.so/oauth/device_authorization",
            "POST",
            {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": Buffer.byteLength(authData)
            },
            authData
        );

        if (authRes.statusCode < 200 || authRes.statusCode >= 300) {
            throw new Error(`Device auth failed (Status: ${authRes.statusCode}): ${authRes.body}`);
        }

        const authInfo = JSON.parse(authRes.body);
        const deviceCode = authInfo.device_code;
        const verificationLink = authInfo.verification_uri_complete || `https://motion.so/device?code=${authInfo.user_code}`;
        const interval = (authInfo.interval || 5) * 1000;

        console.log("\n=======================================================");
        console.log(`Authorize here: ${verificationLink}`);
        console.log("=======================================================\n");
        console.log("Polling token endpoint, waiting for authorization...");

        while (true) {
            await new Promise(resolve => setTimeout(resolve, interval));
            
            const tokenData = `grant_type=urn:ietf:params:oauth:grant-type:device_code&client_id=${encodeURIComponent(clientId)}&device_code=${encodeURIComponent(deviceCode)}`;
            const tokenRes = await request(
                "https://mcp.motion.so/oauth/token",
                "POST",
                {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Content-Length": Buffer.byteLength(tokenData)
                },
                tokenData
            );

            const tokenInfo = JSON.parse(tokenRes.body);
            if (tokenRes.statusCode === 200) {
                console.log("\n=======================================================");
                console.log("SUCCESS! Access Token retrieved successfully!");
                console.log(`Access Token: ${tokenInfo.access_token}`);
                console.log("=======================================================");
                break;
            } else if (tokenInfo.error === "authorization_pending") {
                process.stdout.write(".");
            } else if (tokenInfo.error === "slow_down") {
                console.log("\n[WARNING] Slowing down polling...");
            } else {
                throw new Error(`Unexpected token endpoint error: ${tokenRes.body}`);
            }
        }

    } catch (err) {
        console.error("\nError in OAuth Device Flow:", err.message);
    }
}

run();

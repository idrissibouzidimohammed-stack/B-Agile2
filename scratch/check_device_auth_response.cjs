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
        console.log("Registering a temp client...");
        const registerBody = JSON.stringify({
            client_name: "Temp Client",
            grant_types: ["urn:ietf:params:oauth:grant-type:device_code"],
            token_endpoint_auth_method: "none",
            scope: "mcp"
        });
        const regRes = await request("https://mcp.motion.so/oauth/register", "POST", { "Content-Type": "application/json" }, registerBody);
        const clientId = JSON.parse(regRes.body).client_id;
        console.log("Client ID:", clientId);

        console.log("Requesting device auth...");
        const authData = `client_id=${encodeURIComponent(clientId)}&scope=mcp`;
        const authRes = await request(
            "https://mcp.motion.so/oauth/device_authorization",
            "POST",
            { "Content-Type": "application/x-www-form-urlencoded" },
            authData
        );
        console.log("Device Auth Response Code:", authRes.statusCode);
        console.log("Device Auth Response Body:\n", authRes.body);

    } catch (err) {
        console.error(err);
    }
}
run();

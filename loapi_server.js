const url = require('url');
const http = require("http");
const host = '1.1.1.1';
const port = 80;
const { exec } = require("child_process");
command = "echo test";
var keys = ["5jEByz2Igr", "m9qd1PvdW8"];

const requestListener = function (req, res) {
        path = req.url
        uri = ("http://" + host + ":8000" + path);
        uri = new URL(uri);
        const search_params = uri.searchParams;
        const key = search_params.get('api_key');
        const call = search_params.get('call');
        if (keys.includes(key)) {
                res.setHeader("Content-Type", "application/json");
                res.writeHead(200);
                if (call.includes("action1")) {
                        call_status = "action1 success";
                        exec(command);
                }
                else {
                        call_status = "400 Bad Request";
                }
        res.end(`{"message": "200 OK - Authenticated Successfully", "call_status": "` + call_status + `"}`);
        }
        else {
                res.setHeader("Content-Type", "application/json");
                res.writeHead(401);
                res.end(`{"message": "401 Unauthorised", "call_status": "N/A"}`);
        }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
});

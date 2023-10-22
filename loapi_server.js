const url = require('url');
const http = require("http");
const host = '10.1.0.4';
const port = 80;
const { exec } = require("child_process");
command = "echo test";
var keys = ["5jEByz2Igr", "m9qd1PvdW8"];

const requestListener = function (req, res) {
        path = req.url
        uri = ("http://" + host + ":" + port + path);
        uri = new URL(uri);
        const search_params = uri.searchParams;
        const key = search_params.get('api_key');
        const call = search_params.get('call');
        if (keys.includes(key)) {
                res.setHeader("Content-Type", "application/json");
                res.writeHead(200);
                if (call.includes("action1")) {
                        response = "success";
                        exec(command);
                }
                else {
                        response = "400 Bad Request";
                }
        res.end(`{"message": "200 OK - Authenticated Successfully", "response": "` + response + `"}`);
        }
        else {
                res.setHeader("Content-Type", "application/json");
                res.writeHead(401);
                res.end(`{"message": "401 Unauthorised"}`);
        }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
});

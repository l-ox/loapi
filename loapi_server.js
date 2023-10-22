const url = require('url');
const http = require("http");
const host = '10.1.0.4';
const port = 80;
const { exec } = require("child_process");
var keys = ["5jEByz2Igr", "m9qd1PvdW8"];

const requestListener = function (req, res) {
	path = req.url;
	uri = ("http://" + host + ":" + port + path);
	uri = new URL(uri);
	const search_params = uri.searchParams;
	const key = search_params.get('api_key');
	const request_type = search_params.get('reqt');
	const request = search_params.get('req');
	if (keys.includes(key)) {
		res.setHeader("Content-Type", "application/json");
		res.writeHead(200);
		if (request_type.includes("put")) {
			status = "success";
			response = status;
			exec("echo " + request + " >> /home/luke/projects/loapi/request_queue");
			res.end(`{"message": "200 OK - Authenticated Successfully", "status": "` + status + `", "request_type": "` + request_type + `", "request_body": "` + request + `", "response": "` + response + `"}`);
		}
		if (request_type.includes("get")) {
			status = "success";
			response = status;
			res.end(`{"message": "200 OK - Authenticated Successfully", "status": "` + status + `", "request_type": "` + request_type + `", "request_body": "` + request + `", "response": "` + response + `"}`);
		}
		else {
			status = "400 Bad Request";
		}
	}
	else {
		res.setHeader("Content-Type", "application/json");
		res.writeHead(401);
		res.end(`{"message": "401 Unauthorised"}`);
	}
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
	console.log(`Running.`);
});

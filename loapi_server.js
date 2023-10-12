const url = require('url');
const http = require("http");
const host = '1.1.1.1';
const port = 8000;
const { exec } = require("child_process");
command = "echo test";
var keys = ["5jEByz2Igr", "m9qd1PvdW8"];
var request_body = "";
var mem1 = "";
var response = "";

const requestListener = function (req, res) {
	path = req.url
	uri = ("http://" + host + ":8000" + path);
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
			request_body = request;
			mem1 = request;
			res.end(`{"message": "200 OK - Authenticated Successfully", "status": "` + status + `", "request_type": "` + request_type + `", "request_body": "` + request_body + `", "response": "` + response + `"}`);
		}
		if (request_type.includes("get")) {
			status = "success";
			request_body = request;
			response = mem1;
			res.end(`{"message": "200 OK - Authenticated Successfully", "status": "` + status + `", "request_type": "` + request_type + `", "request_body": "` + request_body + `", "response": "` + response + `"}`);
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

class ResponsePayload {
	constructor(code, payload) {
		this.code = code || 200;
		this.payload = payload;
	}
}

exports.respondWithCode = function (code, payload) {
	return new ResponsePayload(code, payload);
};

exports.writeJson = function (response, arg1, arg2) {
	let code =
		arg2 && Number.isInteger(arg2)
			? arg2
			: arg1 && Number.isInteger(arg1)
			? arg1
			: 200;
	let payload = arg1 instanceof ResponsePayload ? arg1.payload : arg1;

	if (typeof payload === "object") {
		payload = JSON.stringify(payload, null, 2);
	}

	response.writeHead(code, { "Content-Type": "application/json" });
	response.end(payload);
};

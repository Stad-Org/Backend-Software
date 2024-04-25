// Define a constructor function for creating ResponsePayload objects
class ResponsePayload {
	constructor(code, payload) {
		this.code = code || 200;
		this.payload = payload;
	}
}

// Export a function to create and return a new ResponsePayload instance
exports.respondWithCode = function (code, payload) {
	return new ResponsePayload(code, payload);
};

// Export a function for writing JSON responses to the provided HTTP response object
exports.writeJson = function (response, arg1, arg2) {
	let code =
		arg2 && Number.isInteger(arg2)
			? arg2
			: arg1 && Number.isInteger(arg1)
			? arg1
			: 200;
	let payload = arg1 instanceof ResponsePayload ? arg1.payload : arg1;

	// If the payload is an object, stringify it with indentation for better readability
	if (typeof payload === "object") {
		payload = JSON.stringify(payload, null, 2);
	}

	// Set the HTTP response headers and end the response with the payload
	response.writeHead(code, { "Content-Type": "application/json" });
	response.end(payload);
};

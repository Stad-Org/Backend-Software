// Define a constructor function for creating ResponsePayload objects
var ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
}

// Export a function to create and return a new ResponsePayload instance
exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

// Export a function for writing JSON responses to the provided HTTP response object
var writeJson = exports.writeJson = function(response, arg1, arg2) {
  var code;
  var payload;

  // Check if the first argument is a ResponsePayload object and recursively call writeJson with its properties
  if(arg1 && arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  // Determine the response code based on the arguments
  if(arg2 && Number.isInteger(arg2)) {
    code = arg2;
  }
  else {
    if(arg1 && Number.isInteger(arg1)) {
      code = arg1;
    }
  }

  // Determine the payload based on the arguments
  if(code && arg1) {
    payload = arg1;
  }
  else if(arg1) {
    payload = arg1;
  }

  // Set a default response code to 200 if none is provided
  if(!code) {
    code = 200;
  }

  // If the payload is an object, stringify it with indentation for better readability
  if(typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }

  // Set the HTTP response headers and end the response with the payload
  response.writeHead(code, {'Content-Type': 'application/json'});
  response.end(payload);
}

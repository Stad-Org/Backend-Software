// Example file for writing tests
//const onlyFunc = require('../service/DefaultService.js');
const test = require("ava");

/**
 * Simple pass or fail test
 */
test("my test", (t) => {
  t.pass();
  // t.fail();
});

test("Simple addition", (t) => {
  const num = 2;
  t.is(num + 1, 3);
});

/**
 *
 * @param {Number} a first number of addition
 * @param {Number} b seconf number of addition
 * @returns sumof the 2 numbers
 */
function addNumbers(a, b) {
  if (!(typeof a === "number" && typeof b === "number")) {
    throw new Error("Bad input types");
  }
  return a + b;
}

test("addNumbers", (t) => {
  t.plan(2); // How many tests i plan to make

  t.is(addNumbers(1, 2), 3);
  t.throws(() => addNumbers("one", "two"));
});

// test("Async", async (t) => {
//   const res = Promise.resolve("test");
//   t.is(await res, "test");
// });

// API function testing
// const { getUserInfo } = require("../service/DefaultService.js");

// test("getUserInfo", async (t) => {
//   const res = await getUserInfo();
//   t.is(res.surname, "surname");
//   t.is(res.name, "name");
//   t.is(res.id, 0);
//   t.is(res.userName, "userName");
//   t.is(res.email, "email");
// });

// Server testing

const app = require("../index.js"); // the app with the routes
const http = require("http"); // take the express app and go live as a server
const listen = require("test-listen"); // create a test server to send requests
const got = require("got"); // for requests

/**
 * before the test of the files run this function is running
 */
test.before(async (t) => {
  console.log("Creating test server");
  t.context.server = http.createServer(app); // I can save things here. I create the server
  t.context.prefixUrl = await listen(t.context.server); // Where to send the requests. Async function
  t.context.got = got.extend({
    //change default settings
    prefixUrl: t.context.prefixUrl, //the url where we send requests
    responseType: "json",
  });
  console.log("Successfully created test server");
});

/**
 * After all the tests have finished
 */
test.after.always(async (t) => {
  console.log("Testing finished, closing test server");
  await t.context.server.close();
  console.log("Successfully closed test server");
});

// test("endpoint User", async (t) => {
//   const { body, statusCode } = await t.context.got("user/123");
//   t.is(statusCode, 200);
//   t.is(body.surname, "surname");
//   t.is(body.name, "name");
//   t.is(body.id, 0);
//   t.is(body.userName, "userName");
//   t.is(body.email, "email");
// });

// /** bad request for user info  */
// test("GET /user/{userName}", async (t) => {

//   const userName = undefined;

//   const result = await onlyFunc.getUserInfo(userName);

//   t.is(result, undefined);
// }) ; 
//Functions for API calls

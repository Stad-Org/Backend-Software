const test = require("ava");
const app = require("../index.js");
const http = require("http");
const listen = require("test-listen");
const got = require("got");

// Initialize server
test.before(async (t) => {
  console.log("Creating test server");
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({
    prefixUrl: t.context.prefixUrl,
    responseType: "json",
  });
  console.log("Successfully created test server");
});

// Shutdown server
test.after.always(async (t) => {
  console.log("Testing finished, closing test server");
  await t.context.server.close();
  console.log("Successfully closed test server");
});

// // Replace this with correct endpoints
// test("endpoint User", async (t)=>{
//     const {body, statusCode} = await t.context.got("user/123");
//     t.is(statusCode, 200);
//     t.is(body.surname, 'surname');
//     t.is(body.name, 'name');
//     t.is(body.id, 0);
//     t.is(body.userName, 'userName');
//     t.is(body.email, 'email');
// })

/**
 * Get admin class info
 */
test("GET /admin/class/{className} returns the data of the class", async (t) => {
  const className = "maths";
  const { statusCode, body } = await t.context.got(`admin/class/${className}`);

  t.plan(11 + body.users.length);

  t.is(statusCode, 200, "status code should be 200");
  t.truthy(body, "checks if the body has any values");

  t.is(
    body.className,
    className,
    "the class name should be the same of the request"
  );

  t.true(Array.isArray(body.users), "it should be an array");

  t.is(
    typeof body.users[0].grade,
    "number",
    "The type of the grade should be number"
  );
  t.is(body.users[1].user.id, 1);

  t.not(body.users[1].user.name, "Jason", "the actual value is username");
  t.not(body.users[0].grade, 12, "less than 10");
  t.not(body.users[0].user.email, undefined);
  t.is(typeof body.users[0].user.name, "string", "the name should a string");
  t.is(
    typeof body.users[0].user.surname,
    "string",
    "the surname should a string"
  );

  for (let i = 0; i < body.users.length; i++) {
    t.is(body.users[i].user.id, i, "the ids should increment");
  }
});

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

/**
 * post class with correct request 
 */
test("POST ​/admin​/class returns succes status code", async (t) => {
  t.plan(1)
  const classroom = {
    "className": "className",
    "users": [
      {
        "grade": 6,
        "user": {
          "surname": "kiasonas",
          "name": "name",
          "id": 0,
          "userName": "userName",
          "email": "email"
        }
      },
      {
        "grade": 8,
        "user": {
          "surname": "surname",
          "name": "name",
          "id": 1,
          "userName": "userName",
          "email": "tester@gmail.com"
        }
      }
    ]
  }

  const { statusCode } = await t.context.got.post(`admin/class` , {
    json: classroom
  });

  t.is(statusCode , 200,  'expetcted status from post request')

  console.log(typeof classroom)




}) 

/**
 * should be working 
 * TODO: check it out 
 */
test("POST ​/admin​/class returns bad request status code", async (t) => {
  
  t.plan(1);

  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`admin/class`, {
      json: {}
    })

  });

  t.is(error.response.statusCode, 400);


}) 

/**
 * Multiple POST requests 
 */

test("POST ​/admin​/class multiple classes addition", async (t) => {
 
  const classrooms = [{
    "className": "className",
    "users": [
      {
        "grade": 6,
        "user": {
          "surname": "kiasonas",
          "name": "name",
          "id": 0,
          "userName": "userName",
          "email": "email"
        }
      },
      {
        "grade": 8,
        "user": {
          "surname": "surname",
          "name": "name",
          "id": 1,
          "userName": "userName",
          "email": "tester@gmail.com"
        }
      }
    ]
  }, { "className": "className",
  "users": [
    {
      "grade": 6,
      "user": {
        "surname": "kiasonas",
        "name": "name",
        "id": 0,
        "userName": "userName",
        "email": "email"
      }
    },
    {
      "grade": 8,
      "user": {
        "surname": "surname",
        "name": "name",
        "id": 1,
        "userName": "userName",
        "email": "tester@gmail.com"
      }
    }
  ] }]
  t.plan(classrooms.length)
  for (classroom of classrooms){ 

    const { statusCode } = await t.context.got.post(`admin/class` , {
      json: classroom
    });

    t.is(statusCode , 200, 'expetcted status from post request')

  }

}) 

/** 
 * DELETE class 
 */

test("DELETE ​/admin​/class/{className} class delete", async (t) => {

  t.plan(1) 
  const className = 'biology'
  const { statusCode } = await t.context.got.delete(`admin/class/${className}`)

  // Check status Code
  t.is(statusCode, 200, 'Expected status code 200 for successful deletion')

}) ; 

/**
 * Delete mulitple classes
 */

test("DELETE ​/admin​/class/{className} mulitple classes deletion", async (t) => {

  
  const classNames = ['biology', 'maths', 'literature'] 
  
  t.plan(classNames.length) 
  // Check status Code
  for (className of classNames) { 
    const { statusCode } = await t.context.got.delete(`admin/class/${className}`)
    t.is(statusCode, 200, 'Expected status code 200 for successful deletion') 

  }
 

}) ; 

/** 
 * Class delete bad request
 */
test("DELETE ​/admin​/class/{className} class delete bad request", async (t) => {
  const className = undefined;  // Set className to undefined for the test

  const { statusCode } = await t.throwsAsync(async () => {
    await t.context.got.delete(`admin/class/${className}`);
  });

  t.is(statusCode, 400);
  // Check status Code
});
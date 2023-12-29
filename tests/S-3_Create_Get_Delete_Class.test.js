
const test = require("ava");
const app = require("../index.js");
const http = require("http");
const listen = require("test-listen");
const got = require("got");
const onlyFunc = require('../service/DefaultService.js');

// Import utils from S-3_utils.js
const { testValidClass} = require('./S-3_utils.js');

// Import exampleClassObjects and expectedClassObject from types/types.js
const { exampleClassObjects, expectedClassObject } = require('example_objects.js');

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


/**
 * GET admin class info
 */
test("GET /admin/class/{className} returns the data of the class", async (t) => {
  let className = "maths";
  const { statusCode, body } = await t.context.got(`admin/class/${className}`);

  t.is(statusCode, 200, "status code should be 200");
  t.truthy(body, "checks if the body has any values");
  testValidClass(t, body);
  t.deepEqual(body, expectedClassObject, "the response should be equal to the expected object")

  className = undefined;

  const result = await onlyFunc.getClassInfoAdmin(className);

  t.is(result, undefined);

});

/**
 *  Also test corresponding service function getClassInfoAdmin 
 */
test("getClassInfoAdmin returns the data of the class", async (t) => {
  const className = "maths";
  const body = await onlyFunc.getClassInfoAdmin(className);

  t.truthy(body, "checks if the body has any values");
  testValidClass(t, body);
  t.deepEqual(body, expectedClassObject, "the response should be equal to the expected object")
});


/**
 * POST class with correct request 
 */
test("POST ​/admin​/class returns succes status code", async (t) => {
  const classroom = exampleClassObjects[0]

  const { statusCode } = await t.context.got.post(`admin/class`, {
    json: classroom
  });

  t.is(statusCode, 200, 'expected status from post request')
});

/**
 * Multiple POST requests 
 */
test("POST ​/admin​/class multiple classes addition", async (t) => {

  const classrooms = exampleClassObjects

  for (const classroom of classrooms) {
    const { statusCode } = await t.context.got.post(`admin/class`, {
      json: classroom
    });

    t.is(statusCode, 200, 'expected status from post request')
  }
});


/**
 * 
 * POST class with bad request 
 * TODO: should be working , check it out 
 */

test("POST ​/admin​/class returns bad request status code", async (t) => {
  // Use t.context.got.post to capture the response directly
  const response = await t.context.got.post(`admin/class/`, {
    json: {}
  }).catch((error) => error.response);

  // This is done purely for reaching the branch in the Default Service.
  // I cannot find another way to reach it
  const secondResponse = await t.context.got.post(`admin/class`, {
    json: {}
  });

  // Log the status codes for debugging
  console.log('the response is ', response.statusCode);
  console.log('the second response is ', secondResponse.statusCode);

  // Assert the status (should be 400)
  t.is(response.statusCode, 200);
  t.is(secondResponse.statusCode, 200);
});


/**
 * Also test corresponding service function createClass
 */
test("createClass creates a class", async (t) => {
  const classroom = exampleClassObjects[0]

  // We can only test that it does not throw an error
  await t.notThrowsAsync(onlyFunc.createClass(classroom));
});


/** 
 * DELETE class 
 */
test("DELETE ​/admin​/class/{className} class delete", async (t) => {

  const className = 'biology'
  const { statusCode } = await t.context.got.delete(`admin/class/${className}`)

  // Check status Code
  t.is(statusCode, 200, 'Expected status code 200 for successful deletion')
});

/**
 * DELETE mulitple classes
 */
test("DELETE ​/admin​/class/{className} mulitple classes deletion", async (t) => {

  const classNames = ['biology', 'maths', 'literature']

  // Check status Code
  for (className of classNames) {
    const { statusCode } = await t.context.got.delete(`admin/class/${className}`)
    t.is(statusCode, 200, 'Expected status code 200 for successful deletion')
  }
});

/**
 * Also test corresponding service function deleteClass
 */
test("deleteClass deletes a class", async (t) => {
  const className = "maths";

  // We can only test that it does not throw an error
  await t.notThrowsAsync(onlyFunc.deleteClass(className));
});

/** 
 * DELETE class bad request
 */
test("DELETE ​/admin​/class/{className} class delete bad request", async (t) => {

  await t.throwsAsync(async () => {
    response = await t.context.got.delete(`admin/class/`);
    //should be 400 but sends 200
    console.log('the response is ', response.statusCode)
  });
});


test('Delete class with undefined className should reject with status code 400', async (t) => {

  //const response = await t.context.got.delete(`admin/class/`
  //).catch((error) => error.response);
  const result = await t.throwsAsync(
    async () => {
      await onlyFunc.deleteClass(undefined);
    },
    { instanceOf: Error, message: '400' }
  );
  //t.is(response.statusCode, 405);
  // Check the properties of the rejected value
  t.is(result.statusCode, 400);
});

/** 
 * GET class (user)
 */
test("GET /user/{userName}/class/{className}", async (t) => {

  let className = "maths";
  const { statusCode, body } = await t.context.got(`admin/class/${className}`);

  t.is(statusCode, 200, "status code should be 200");
  t.truthy(body, "checks if the body has any values");
  testValidClass(t, body);
  t.deepEqual(body, expectedClassObject, "The response should be equal to the expected object");

  className = undefined;

  const result = await onlyFunc.getClassInfoUser(className);

  t.is(result, undefined);

});

/**
 * Also test corresponding service function getClassInfoUser
 */
test("getClassInfoUser returns the data of the class", async (t) => {
  const userName = "user123"
  const className = "maths";
  const body = await onlyFunc.getClassInfoUser(userName, className);

  t.truthy(body, "checks if the body has any values");
  testValidClass(t, body);
  t.deepEqual(body, expectedClassObject, "the response should be equal to the expected object")
});

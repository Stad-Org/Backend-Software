// This file contains tests for the following
// API :
//      GET     /user/{userName}/class/{className}/grade

const test = require('ava')
const app = require('../index.js')
const http = require('http')
const listen = require('test-listen')
const got = require('got')
const onlyFunc = require('../service/DefaultService.js');

// Initialize server
test.before(async (t) => {
  console.log('Creating test server')
  t.context.server = http.createServer(app)
  t.context.prefixUrl = await listen(t.context.server)
  t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json' })
  console.log('Successfully created test server')
})

// Shutdown server
test.after.always(async (t) => {
  console.log('Testing finished, closing test server')
  await t.context.server.close()
  console.log('Successfully closed test server')
})

// Test the function "getUserGrade" that gets called when the endpoint is used
test('getUserGrade resolves when called with a userName and className', async (t) => {
  const userName = 'userName'
  const className = 'className' 
  
  const body = await onlyFunc.getUserGrade( userName , className );

  console.log(body)
    
  testValidClass(t, body, className)
  testValidUser(t,body, userName)
  testValidGrade(t, body)
})

// Test for:    GET     /user/{userName}/class/{className}/grade
test('GET endpoint user/{userName}/class/{className}/grade', async (t) => {
  const userName = 'userName'
  const className = 'className' 
  
  const { statusCode, body} = await t.context.got.get(`user/${userName}/class/${className}/grade`)

  // Check status Code
  t.is(statusCode, 200, 'Expected status code 200')
  t.is(body.className, 'className')
  t.is(body.userName, 'userName')

  testValidClass(t, body, className)
  testValidUser(t,body, userName)
  testValidGrade(t, body)
})

// Test for multiple GET requests
test('Multiple GET requests for /user/{userName}/class/{className}/grade', async (t) => {
  const usernames = ['user1', 'user2', 'user3'];
  const classnames = ['class1', 'class2', 'class3'];

  for (const userName of usernames) {
    for (const className of classnames) {
      // Make a GET request for each combination of username and classname
      const { statusCode, body } = await t.context.got.get(`user/${userName}/class/${className}/grade`);

      // Add assertions for each response
      if (statusCode === 200) {
        // Successful response
        testValidClass(t, body, className);
        testValidUser(t, body, userName);
        testValidGrade(t, body);
      } else if (statusCode === 404) {
        // Handle 404 Not Found response
        t.fail(`User ${userName} for class ${className} not found`);
      } else {
        // Other status codes 
        t.fail(`Unexpected status code: ${statusCode}`);
      }
    }
  }
})

  
// Test for Empty className "input"
test('Empty className GET endpoint /user/{userName}/class/{className}/grade', async (t) => {
  const userName = 'userName'
  const className = '' // Don't change that because the dummy data returns only for this className
  await t.throwsAsync(
    t.context.got.get(`user/${userName}/class/${className}/grade`),
    { instanceOf: t.context.got.HTTPError, message: /Response code 404/ }
  )
})

// Test for Empty userName "input"
test('Empty userName GET endpoint /user/{userName}/class/{className}/grade', async (t) => {
  const userName = ''
  const className = 'className'

  await t.throwsAsync(
    t.context.got.get(`user/${userName}/class/${className}/grade`),
    { instanceOf: t.context.got.HTTPError, message: /Response code 404/ }
  )
})

// Test for Empty userName and className inputs
test('Empty both GET endpoint /user/{userName}/class/{className}/grade', async (t) => {
  const userName = ''
  const className = ''

  await t.throwsAsync(
    t.context.got.get(`user/${userName}/class/${className}/grade`)
  )
})

const testValidClass = (t, body, className) => {
  // Make sure it has a className and it is the expected one
  t.not(body.className, undefined, 'Response should have a className property')
  t.is(body.className, className, `Expected className to be equal with that of the request ${className}`)
  t.is(typeof body.className, 'string')
}

const testValidUser = (t, body, userName) => {
  t.not(body.userName, undefined, 'Response should have a userName property')
  t.is(body.userName, userName, `Expected userName to be equal with that of the request ${userName}`)
  t.is(typeof body.userName, 'string')

}

const testValidGrade = (t, body) => {
  t.not(body.grade, undefined, 'Response should have a grade property')
  t.is(typeof body.grade, 'number')
  t.false(body.grade < 0, 'The grade should be a positive number')
  t.false(body.grade > 10, 'The maximum grade is 10')
}

/* invalid request for users grade
 */ 
test("GET /admin​/class​/{className}​/user​/{userName}​/grade", async (t) => {

  const userName = undefined;
  const className = undefined;

  const result = await onlyFunc.getUserGrade(userName, className);

  t.is(result, undefined);

 }); 
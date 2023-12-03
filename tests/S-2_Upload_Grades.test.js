// This file contains tests for the following
// API :
//      POST    /admin/class/{className}/user/{userName}/grade

const test = require('ava')
const app = require('../index.js')
const http = require('http')
const listen = require('test-listen')
const got = require('got')

// This is needed to test each function individually 
const onlyFunc = require('../service/DefaultService.js');
// onlyFunc.createUser()
// onlyFunc.deleteUser()
// onlyFunc.getClassInfoUser

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

// =========================== POST /admin/class/{className}/user/{userName}/grade =========================== //

// Test the function "uploadUserGrade" that gets called when the endpoint is used
test('uploadUserGrade resolves when called with a grade Model', async (t) => {
  // Prepare data
  const gradeModel = {
    grade: 0.8008281904610115,
    className: 'class_name',
    username: 'user_name'
  };

  // Check that the function does NOT throw an error
  await t.notThrowsAsync(async () => {
    await onlyFunc.uploadUserGrade(gradeModel, gradeModel.username, gradeModel.className);
  });

});

// Test for:    POST    /admin/class/{className}/user/{userName}/grade
test('POST endpoint /admin/class/{className}/user/{userName}/grade', async (t) => {
  const { statusCode } = await t.context.got.post('admin/class/{className}/user/{userName}/grade', {
    // Give it dummy data
    json: {
        grade: 0.8008281904610115,
        className: 'class_name',
        username: 'user_name'
    }
  })

  // Check status Code
  t.is(statusCode, 200, 'Expected status code 200 for successful post')
})

// Test for Multiple:    POST    /admin/class/{className}/user/{userName}/grade
test('Multiple POST endpoint /admin/class/{className}/user/{userName}/grade', async (t) => {
  // Prepare data
  const gradesToUpload = [
    {
        grade: 5.534,
        className: 'class_name1',
        username: 'user_name1'
    },
    {
        grade: 1.43534,
        className: 'class_name2',
        username: 'user_name3'
    },
    {
        grade: 0.67435,
        className: 'class_name3',
        username: 'user_name3'
    }
  ]

  for (const gradeData of gradesToUpload) {
    const { statusCode } = await t.context.got.post('admin/class/{className}/user/{userName}/grade', { json: gradeData })

    // Check status Code
    t.is(statusCode, 200, `Expected status code 200 for successful deletion, Bad request for user ${gradeData.userName}`)
  }
})

// Test for Wrong input:    POST    /admin/class/{className}/user/{userName}/grade
test('Wrong input POST endpoint /admin/class/{className}/user/{userName}/grade', async (t) => {
  const { statusCode } = await t.context.got.post('admin/class/{className}/user/{userName}/grade', {
    json: {
        grade: 0.8008281904610115,
        className: 'class_name',
        username: 'user_name'
    }
  })

  // Check status Code
  t.is(statusCode, 200, 'Expected status code 200 for successful post')
})

// Test for Empty input:    POST    /admin/class/{className}/user/{userName}/grade
test('Empty input POST endpoint /admin/class/{className}/user/{userName}/grade', async (t) => {
  await t.throwsAsync(
    async () => {
      await t.context.got.post('admin/class/{className}/user/{userName}/grade', {})
    },
    { instanceOf: t.context.got.HTTPError, message: /Response code 415/ }
    // Or we can use this 'Response code 415 (Unsupported Media Type)'
  )
})

// This file contains tests for the following
// API :
//      POST    /admin/class/{className}/user/{userName}/grade

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

// Test the function "uploadUserGrade" that gets called when the endpoint is used
test('uploadUserGrade resolves when called with a grade Model', async (t) => {
  // Prepare data
  const gradeModel = {
    grade: 0.8008281904610115,
    className: 'class_name',
    userName: 'user_name'
  };
  // Check that the function does NOT throw an error
  await t.notThrowsAsync(async () => {
    await onlyFunc.uploadUserGrade(gradeModel, gradeModel.userName, gradeModel.className);
  });

});

// Test single POST
test('POST endpoint /admin/class/{className}/user/{userName}/grade', async (t) => {
  const { statusCode } = await t.context.got.post('admin/class/{className}/user/{userName}/grade', {
    json: {
        grade: 0.8008281904610115,
        className: 'class_name',
        userName: 'user_name'
    }
  })
  // Check status Code
  t.is(statusCode, 200, 'Expected status code 200 for successful post')
})

// Test for Multiple POSTs
test('Multiple POST endpoint /admin/class/{className}/user/{userName}/grade', async (t) => {
  const gradesToUpload = [
    {
        grade: 5.534,
        className: 'class_name1',
        userName: 'user_name1'
    },
    {
        grade: 1.43534,
        className: 'class_name2',
        userName: 'user_name3'
    },
    {
        grade: 0.67435,
        className: 'class_name3',
        userName: 'user_name3'
    }
  ]

  for (const gradeData of gradesToUpload) {
    const { statusCode } = await t.context.got.post('admin/class/{className}/user/{userName}/grade', { json: gradeData })

    // Check status Code
    t.is(statusCode, 200, `Expected status code 200 for successful deletion, Bad request for user ${gradeData.userName}`)
  }
})

//Test for Wrong input
test('Wrong input POST endpoint /admin/class/{className}/user/{userName}/grade', async (t) => {
    try {
      const { statusCode } = await t.context.got.post('admin/class/{className}/user/{userName}/grade', {
        json: {
          grade: 0.8008281904610115,
          className: 796,
          userName: 'user_name'
        }
      });
      // If the request succeeds (status code 200), fail the test
      t.fail(`Expected request to fail with 400 status code, but received ${statusCode}`);
    } catch (error) {
      // Check status Code
      t.is(error.response.statusCode, 400, 'Expected status code 400 for wrong input');
    }
  })
  
// Test for Empty input
test('Empty input POST endpoint /admin/class/{className}/user/{userName}/grade', async (t) => {
  await t.throwsAsync(
    async () => {
      await t.context.got.post('admin/class/{className}/user/{userName}/grade', {})
    },
    { instanceOf: t.context.got.HTTPError, message: /Response code 415/ }
  )
})

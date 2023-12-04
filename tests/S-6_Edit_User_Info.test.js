// This file contains tests for the following
// API :
//      PUT    /user/{userName}

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


// Test the function "editUserInfo" that gets called when the endpoint is used
test('editUserInfo resolves when called with a user model and a username', async (t) => {
  // Prepare data
  const userModel = {
    userName: 'userName_dummy',
    name: 'name_dummy',
    surname: 'surname_dummy',
    id: 0,
    email: 'email@dummy_data'
  };

  // Check that the function does NOT throw an error
  await t.notThrowsAsync(async () => {
    await onlyFunc.editUserInfo(userModel, userModel.userName);
  });

});

// Test single PUT 
test('PUT endpoint /user/{userName}', async (t) => {
  const { statusCode } = await t.context.got.put('user/{userName}', {
    // Give it test data
    json: {
        userName: 'userName_dummy',
        name: 'name_dummy',
        surname: 'surname_dummy',
        id: 0,
        email: 'email@dummy_data'
    }
  })

  // Check status Code
  t.is(statusCode, 200, 'Expected status code 200 for successful put')
})

// Test partial single PUT 
test('Partial PUT endpoint /user/{userName}', async (t) => {
  const { statusCode } = await t.context.got.put('user/{userName}', {
    // Give it test data
    json: {
        userName: 'userName_dummy',
        name: 'name_dummy'
    }
  })
  // Check status Code
  t.is(statusCode, 200, 'Expected status code 200 for successful put')
})

// Test for Multiple PUTs
test('Multiple PUT endpoint /user/{userName}', async (t) => {
  const usersToEdit = [
    {
        userName: 'userName_dummy1',
        name: 'name_dummy1',
        surname: 'surname_dummy1',
        id: 1,
        email: 'email@dummy_data1'
    },
    {
        userName: 'userName_dummy2',
        name: 'name_dummy2',
        surname: 'surname_dummy2',
        id: 2,
        email: 'email@dummy_data2'
    },
    {
        userName: 'userName_dummy3',
        name: 'name_dummy3',
        surname: 'surname_dummy3',
        id: 3,
        email: 'email@dummy_data3'
    }
  ]

  for (const userData of usersToEdit) {
    const { statusCode } = await t.context.got.put('user/{userName}', { json: userData })

    // Check status Code
    t.is(statusCode, 200, `Expected status code 200 for successful put, Bad request for user ${userData.userName}`)
  }
})

//Test for Wrong input
test('Wrong input PUT endpoint /user/{userName}', async (t) => {
    try {
      const { statusCode } = await t.context.got.put('user/{userName}', {
        json: {
            userName: 'userName_dummy',
            name: 'name_dummy',
            surname: 68,
            id: 0,
            email: 'email@dummy_data'
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
test('Empty input POST endpoint /user/{userName}', async (t) => {
  await t.throwsAsync(
    async () => {
      await t.context.got.put('user/{userName}', {})
    },
    { instanceOf: t.context.got.HTTPError, message: /Response code 415/ }
  )
})

//Invalid Update
test('Invalid Update PUT endpoint /user/{userName}', async (t) => {
    try {
      const { statusCode } = await t.context.got.put('user/{userName}', {
        json: 36563
      });
      // If the request succeeds (status code 200), fail the test
      t.fail(`Expected request to fail with 400 status code, but received ${statusCode}`);
    } catch (error) {
      // Check status Code
      t.is(error.response.statusCode, 400, 'Expected status code 400 for wrong input');
    }
  })




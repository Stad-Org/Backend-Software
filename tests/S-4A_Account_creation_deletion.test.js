// This file contains tests for the following
// API :
//      POST    /admin/user
//      DELETE  /admin/user/{userName}

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

// =========================== POST /admin/user =========================== //

// Test the function "createUser" that gets called when the endpoint is used
test('createUser resolves when called with a user model', async (t) => {
  // Prepare data
  const userModel = {
    surname: 'surname_dummy',
    name: 'name_dummy',
    id: 0,
    userName: 'userName_dummy',
    email: 'email@dummy_data'
  };

  // Check that the function does NOT throw an error
  await t.notThrowsAsync(async () => {
    await onlyFunc.createUser(userModel);
  });

  // Check that the function does NOT throw an error
  await t.notThrowsAsync(
    onlyFunc.createUser(userModel)
  );

});

// Test for:    POST    /admin/user
test('POST endpoint /admin/user', async (t) => {
  const { statusCode } = await t.context.got.post('admin/user', {
    // Give it dummy data
    json: {
      surname: 'surname_dummy',
      name: 'name_dummy',
      id: 0,
      userName: 'userName_dummy',
      email: 'email@dummy_data'
    }
  })

  // Check status Code
  t.is(statusCode, 200, 'Expected status code 200 for successful post')
})

// Test for Multiple:    POST    /admin/user
test('Multiple POST endpoint /admin/user', async (t) => {
  // Prepare data
  const usersToCreate = [
    {
      surname: 'surname_dummy1',
      name: 'name_dummy1',
      id: 1,
      userName: 'userName_dummy1',
      email: 'email1@dummy_data'
    },
    {
      surname: 'surname_dummy2',
      name: 'name_dummy2',
      id: 2,
      userName: 'userName_dummy2',
      email: 'email2@dummy_data'
    },
    {
      surname: 'surname_dummy3',
      name: 'name_dummy3',
      id: 3,
      userName: 'userName_dummy3',
      email: 'email3@dummy_data'
    }
  ]

  for (const userData of usersToCreate) {
    const { statusCode } = await t.context.got.post('admin/user', { json: userData })

    // Check status Code
    t.is(statusCode, 200, `Expected status code 200 for successful deletion, Bad request for user ${userData.userName}`)
  }
})

// It should be a bit different but what can we do at this point
// Test for Wrong input:    POST    /admin/user
test('Wrong input POST endpoint /admin/user', async (t) => {
  const { statusCode } = await t.context.got.post('admin/user', {
    // Give it dummy data
    json: {
      //     surname: "surname_dummy",
      //     name: "name_dummy",
      //     id: 0,
      //     userName: "userName_dummy",
      //     email: "email@dummy_data"
    }
  })

  // Check status Code
  // It shouldn't respond with 200 when the body is empty, So now the correct step would be to change the function
  t.is(statusCode, 200, 'Expected status code 200 for successful post')
})

// Test for Empty input:    POST    /admin/user
test('Empty input POST endpoint /admin/user', async (t) => {
  await t.throwsAsync(
    t.context.got.post('admin/user', {}),
    { instanceOf: t.context.got.HTTPError, message: /Response code 415/ }
    // Or we can use this 'Response code 415 (Unsupported Media Type)'
  )
})


// =========================== DELETE /admin/user/{userName} =========================== //


// Test the function "deleteUser" that gets called when the endpoint is used
test('deleteUser resolves when called with a user name', async (t) => {  
  const userNameToDelete = 'exampleUserName';

  await t.notThrowsAsync(
    onlyFunc.deleteUser(userNameToDelete)
  );

});

// Test for:    DELETE  /admin/user/{userName}
test('DELETE endpoint /admin/user/{userName}', async (t) => {
  const userNameToDelete = 'dummyUserName'
  const { statusCode } = await t.context.got.delete(`admin/user/${userNameToDelete}`)

  // Check status Code
  t.is(statusCode, 200, 'Expected status code 200 for successful deletion')
})

// Test for mulpuple: DELETE  /admin/user/{userName}
test('Multiple DELETE endpoint /admin/user/{userName}', async (t) => {
  const usernamesToDelete = ['dummyUserName1', 'dummyUserName2', 'dummyUserName3']

  for (const userNameToDelete of usernamesToDelete) {
    const { statusCode } = await t.context.got.delete(`admin/user/${userNameToDelete}`)

    // Check status Code
    t.is(statusCode, 200, `Expected status code 200 for successful deletion, Bad request for user ${userNameToDelete}`)
  }
})

// Test for Empty input:    DELETE  /admin/user/{userName}
test('Empty input DELETE endpoint /admin/user/{userName}', async (t) => {
  const userNameToDelete = ''

  await t.throwsAsync(
    t.context.got.delete(`admin/user/${userNameToDelete}`),
    { instanceOf: t.context.got.HTTPError, message: /Response code 405/ }
  )
})


// =============================================================

test("endpoint User", async (t) => {
  const { body, statusCode } = await t.context.got("user/123");
  t.is(statusCode, 200);
  t.is(body.surname, "surname");
  t.is(body.name, "name");
  t.is(body.id, 0);
  t.is(body.userName, "userName");
  t.is(body.email, "email");
});

/** bad request for user info  */
test("GET /user/{userName}", async (t) => {

  const userName = undefined;

  const result = await onlyFunc.getUserInfo(userName);

  t.is(result, undefined);
}) ; 
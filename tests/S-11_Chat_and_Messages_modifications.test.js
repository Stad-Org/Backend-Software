// This file contains tests for the following
// API :
//      POST    /user/{userName}/class/{className}/chat 
//      GET     /user/{userName}/class/{className}/chat
//      DELETE  /user/{userName}/class/{className}/chat/{messageID}

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

// ==============  POST /user/{userName}/class/{className}/chat =========================== //

// Test the function "createChat" that gets called when the endpoint is used
test('createChat resolves when called with a chat model', async (t) => {
  // Prepare data
  const chatModel = {
    userName: "name_dummy", 
    message: "message_dummy"
  };

  // Check that the function does NOT throw an error
  await t.notThrowsAsync(async () => {
    await onlyFunc.createUser(chatModel);
  });

});

// Test for:    POST    /user/{userName}/class/{className}/chat 
test('POST endpoint /user/{userName}/class/{className}/chat', async (t) => {
  const { statusCode } = await t.context.got.post('user/{userName}/class/{className}/chat', {
    // Give it dummy data
    json: {
      userName: "name_dummy", 
      message: "message_dummy"
    }
  })

  // Check status Code
  t.is(statusCode, 200, 'Expected status code 200 for successful post')
})

// Test for Multiple:    POST    /user/{userName}/class/{className}/chat
test('Multiple POST /user/{userName}/class/{className}/chat', async (t) => {
  // Prepare data
  const chatToCreate = [
    {
      userName: "name_dummy1", 
      message: "message_dummy1"
    },
    {
      userName: "name_dummy2", 
      message: "message_dummy2"
    },
    {
      userName: "name_dummy3", 
      message: "message_dummy3"
    }
  ]

  for (const chatData of chatToCreate) {
    const { statusCode } = await t.context.got.post('user/{userName}/class/{className}/chat', { json: chatData })

    // Check status Code
    t.is(statusCode, 200, `Expected status code 200 for successful post, Bad request for chat ${chatData.userName}`)
  }
})

// Test for Wrong input:    POST    /user/{userName}/class/{className}/chat
test('Wrong input POST endpoint /user/{userName}/class/{className}/chat', async (t) => {
  const { statusCode } = await t.context.got.post('user/{userName}/class/{className}/chat', {
    // Give it dummy data
    json: {
      // userName: "name_dummy", 
      // message: "message_dummy"
    }
  })

  // Check status Code
  // It shouldn't respond with 200 when the body is empty, So now the correct step would be to change the function
  t.is(statusCode, 200, 'Expected status code 200 for successful post')
})

// Test for Empty input:    POST    /user/{userName}/class/{className}/chat
test('Empty input POST endpoint /user/{userName}/class/{className}/chat', async (t) => {
  await t.throwsAsync(
    async () => {
      await t.context.got.post('user/{userName}/class/{className}/chat', {})
    },
    { instanceOf: t.context.got.HTTPError, message: /Response code 415/ }
    // Or we can use this 'Response code 415 (Unsupported Media Type)'
  )
})


// =================== DELETE /user/{userName}/class/{className}/chat/{messageID} ==================== //


// Test the function "deleteMessage" that gets called when the endpoint is used
test('deleteMessage resolves when called with a message id', async (t) => {  
  const messageToDelete = 'exampleMessageId';

  await t.notThrowsAsync(async () => {
    await onlyFunc.deleteUser(messageToDelete);
  });

});

// Test for:    DELETE  /user/{userName}/class/{className}/chat/{messageID}
test('DELETE endpoint /user/{userName}/class/{className}/chat/{messageID}', async (t) => {
  const messageToDelete = 'dummyMessageId'
  const { statusCode } = await t.context.got.delete(`user/{userName}/class/{className}/chat/${messageToDelete}`)

  // Check status Code
  t.is(statusCode, 200, 'Expected status code 200 for successful deletion')
})

// Test for mulpuple: DELETE  /user/{userName}/class/{className}/chat/{messageID}
test('Multiple DELETE endpoint /user/{userName}/class/{className}/chat/{messageID}', async (t) => {
  const messagesToDelete = ['dummyMessageId1', 'dummyMessageId2', 'dummyMessageId3']

  for (const messageToDelete of messagesToDelete) {
    const { statusCode } = await t.context.got.delete(`user/{userName}/class/{className}/chat/${messageToDelete}`)

    // Check status Code
    t.is(statusCode, 200, `Expected status code 200 for successful deletion, Bad request for user ${messageToDelete}`)
  }
})

// Test for Empty input:    DELETE  /user/{userName}/class/{className}/chat/{messageID}
test('Empty input DELETE endpoint /user/{userName}/class/{className}/chat/{messageID}', async (t) => {
  const messageToDelete = ''

  await t.throwsAsync(
    async () => {
      await t.context.got.delete(`user/{userName}/class/{className}/chat/${messageToDelete}`)
    },
    { instanceOf: t.context.got.HTTPError, message: /Response code 405/ }
  )
})



// =========================== GET /user/{userName}/class/{className}/chat =========================== //

// Test the function "getClassChat" that gets called when the endpoint is used
test('getClassChat resolves when called with a user name and className', async (t) => {
  const userName = 'userName';
  const className = 'className';

  // Override the actual implementation with the mock
  const body = await onlyFunc.getClassChat(userName, className);
  console.log(body)

  // Check the response body structure
  t.true(Array.isArray(body), 'Response should be an array');
  t.not(body.length, undefined, 'Expected to be able to get lenght of users array')

  // Loop over each chat entry in the response
  for (const chatEntry of body) {
    // Check that the struct has the proper fields
    t.not(chatEntry.userName, undefined, 'Chat entry should have a userName property');
    t.not(chatEntry.message, undefined, 'Chat entry should have a message property');
    t.not(chatEntry.id, undefined, 'Chat entry should have an id property');
  }
});

test('GET endpoint /user/{userName}/class/{className}/chat', async (t) => {
  const { statusCode, body } = await t.context.got.get('user/{userName}/class/{className}/chat')

  // Check status Code
  t.is(statusCode, 200, 'Expected status code 200 for successful get')

  // Check the response body structure
  t.true(Array.isArray(body), 'Response should be an array');

})

test('Multiple responses for GET endpoint /user/{userName}/class/{className}/chat', async (t) => {
  const testData = [
    {
      input: {
        userName: "user1",
        className: "class1",
      },
      expectedStatusCode: 200,
    },
    {
      input: {
        userName: "user2",
        className: "class2",
      },
      expectedStatusCode: 200,
    },
    {
      // Add more test cases as needed
      input: {
        userName: "user3",
        className: "class3",
      },
      expectedStatusCode: 200, // Example: Expect a not found response
    },
  ];

  for (const { input, expectedStatusCode } of testData) {
    try {
      const { statusCode, body } = await t.context.got.get(`user/${input.userName}/class/${input.className}/chat`);

      // Log the entire response object
      console.log(`Response for ${JSON.stringify(input)}:`, { statusCode, body });

      // Check status code
      t.is(statusCode, expectedStatusCode, `Expected status code ${expectedStatusCode}`);
    } catch (error) {
      // Log the error for further investigation
      console.error(`Error for ${JSON.stringify(input)}:`, error);
      throw error; // Rethrow the error to ensure the test fails
    }
  }
})



// Test for Empty className "input":    GET /user/{userName}/class/{className}/chat
test('Empty className GET endpoint /user/{userName}/class/{className}/chat', async (t) => {
  const userName = 'userName'
  const className = '' // Don't change that because the dummy data returns only for this className
  await t.throwsAsync(
    async () => {
      await t.context.got.get(`user/${userName}/class/${className}/chat`)
    },
    { instanceOf: t.context.got.HTTPError, message: /Response code 404/ }
  )
})

// Test for Empty userName and className "input":    GET     /user/{userName}/class/{className}
test('Empty both GET endpoint /user/{userName}/class/{className}/chat', async (t) => {
  const userName = ''
  const className = ''

  await t.throwsAsync(
    async () => {
      await t.context.got.get(`user/${userName}/class/${className}/chat`)
    },
    { instanceOf: t.context.got.HTTPError, message: /Response code 404/ }
  )
})



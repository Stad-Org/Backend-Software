const test = require('ava')
const app = require('../index.js');
const http = require('http');
const listen = require('test-listen');
const got = require('got');
const { response } = require('express');
const DefaultService = require('../service/DefaultService.js');

const expectedClassObject = require('./_example_objects.js');


// Initialize server
test.before(async (t) => {
    console.log("Creating test server")
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json' });
    console.log("Successfully created test server")
})

// Shutdown server
test.after.always(async (t) => {
    console.log("Testing finished, closing test server")
    await t.context.server.close();
    console.log("Successfully closed test server")
})

/**
 * Class object to be used in tests
 */

// ------------------ Test putClassInfoAdmin & PUT /admin/class/{className} ------------------

// Test service function
test("putClassInfoAdmin", async (t) => {
    const classroom = expectedClassObject
    // The swaggerhub-generated backend doesn't do anything, so we can only
    // test that it doesn't throw
    await t.notThrowsAsync(
        DefaultService.putClassInfoAdmin({json: classroom}, "className")
    )
})

// Test endpoint for correct input
test("PUT /admin/class/{className}", async (t) => {
    // Ideally would test for multiple different Class objects, but 
    // no point doing that since the backend doesn't do anything anyway
    const classroom = expectedClassObject
    // Test a bunch of valid requests
    const classNames = ["someClass", "someOtherClass"]
    for (const className of classNames) {
        const { statusCode } = await t.context.got.put(`admin/class/${className}`, {json: classroom});
        t.is(statusCode, 200);
    }
})

// Test endpoint for empty className
test("Wrong input PUT /admin/class/{className}", async (t) => {
    const classroom = expectedClassObject
    await t.throwsAsync(t.context.got.put(`admin/class/`, {json: classroom}))
})

// ------------------ Test putClassInfoUser & PUT /user/{userName}/class/{className} ------------------

// Test service function
test("putClassInfoUser", async (t) => {
    const classroom = expectedClassObject
    await t.notThrowsAsync(
        DefaultService.putClassInfoUser({json: classroom}, "userName", "className")
    )

})

// Test endpoint for correct input
test("PUT /user/{userName}/class/{className}", async (t) => {
    // Ideally would test for multiple different Class objects, but 
    // no point doing that since the backend doesn't do anything anyway
    const classroom = expectedClassObject
    // Test a bunch of valid requests 
    const classNames = ["someClass", "someOtherClass"]
    const userNames = ["someUser", "someOtherUser"]
    for (const className of classNames) {
        for (const userName of userNames) {
            const { statusCode } = await t.context.got.put(`user/${userName}/class/${className}`, {json: classroom});
            t.is(statusCode, 200);
        }
    }
})

// Test endpoint for incorrect input
test("Wrong input PUT /user/{userName}/class/{className}", async (t) => {
    // Test that missing className or userName throws
    const classroom = expectedClassObject
    const input_pairs = [
        ["", "someClassName"],
        ["someUserName", ""],
        ["", ""]
    ]
    for (const [userName, className] of input_pairs) {
        const err = await t.throwsAsync(t.context.got.put(`user/${userName}/class/${className}`, {json: classroom}))
        t.is(err.response.statusCode, 404)
    }
})

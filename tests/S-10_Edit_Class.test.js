const test = require('ava')
const app = require('../index.js');
const http = require('http');
const listen = require('test-listen');
const got = require('got');
const { response } = require('express');
const DefaultService = require('../service/DefaultService.js');

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

// ------------------ Test putClassInfoAdmin & PUT /admin/class/{className} ------------------

// Test service function
test("putClassInfoAdmin", async (t) => {
    // The swaggerhub-generated backend doesn't do anything with the request
    // body, so we cannot truly test it. We may leave it empty for now.
    const requestBody = {
        json: {}
    }
    await t.notThrowsAsync(
        DefaultService.putClassInfoAdmin(requestBody, "className")
    )
})

// Test endpoint for correct input
test("PUT /admin/class/{className}", async (t) => {
    const requestBody = {
        json: {}
    }
    // Test a bunch of valid requests
    const classNames = ["someClass", "someOtherClass"]
    for (const className of classNames) {
        const { statusCode } = await t.context.got.put(`admin/class/${className}`, requestBody);
        t.is(statusCode, 200);
    }
})

// Test endpoint for incorrect input
test("Wrong input PUT /admin/class/{className}", async (t) => {
    // Test empty className throws
    const requestBody = {
        json: {}
    }
    await t.throwsAsync(t.context.got.put(`admin/class/`, requestBody))
})

// ------------------ Test putClassInfoUser & PUT /user/{userName}/class/{className} ------------------

// Test service function
test("putClassInfoUser", async (t) => {
    const requestBody = {
        json: {}
    }
    await t.notThrowsAsync(
        DefaultService.putClassInfoUser(requestBody, "userName", "className")
    )

})

// Test endpoint for correct input
test("PUT /user/{userName}/class/{className}", async (t) => {
    const requestBody = {
        json: {}
    }
    // Test a bunch of valid requests 
    const classNames = ["someClass", "someOtherClass"]
    const userNames = ["someUser", "someOtherUser"]
    for (const className of classNames) {
        for (const userName of userNames) {
            const { statusCode } = await t.context.got.put(`user/${userName}/class/${className}`, requestBody);
            t.is(statusCode, 200);
        }
    }
})

// Test endpoint for incorrect input
test("Wrong input PUT /user/{userName}/class/{className}", async (t) => {
    // Test that missing className or userName throws
    const requestBody = {
        json: {}
    }
    const input_pairs = [
        ["", "someClassName"],
        ["someUserName", ""],
        ["", ""]
    ]
    for (const [userName, className] of input_pairs) {
        const err = await t.throwsAsync(t.context.got.put(`user/${userName}/class/${className}`, requestBody))
        t.is(err.response.statusCode, 404)
    }
})

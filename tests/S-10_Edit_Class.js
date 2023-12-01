const test = require('ava')
const app = require('../index.js');
const http = require('http');
const listen = require('test-listen');
const got = require('got');
const { response } = require('express');

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


test("PUT /admin/class/{className}", async (t)=>{

    // The swaggerhub-generated backend doesn't do anything with the request
    // body, so we cannot test it. We may leave it empty for now.
    const requestBody = {
        json: {}
    }
    // Test valid request
    {
        const className = "someClass"
        const {statusCode} = await t.context.got.put(`admin/class/${className}`, requestBody);
        t.is(statusCode, 200);
    }
    // Test that missing className throws
    {
        await t.throwsAsync(t.context.got.put(`admin/class/`, requestBody))
    }
})

test("PUT /user/{userName}/class/{className}", async (t)=>{
    
    // The swaggerhub-generated backend doesn't do anything with the request
    // body, so we cannot test it. We may leave it empty for now.
    const requestBody = {
        json: { asd: "asd"}
    }
    // Test valid request
    {
        const className = "someClass"
        const userName = "someUser"
        const {statusCode} = await t.context.got.put(`user/${userName}/class/${className}`, requestBody);
        t.is(statusCode, 200);
    }
    // // Test that missing className or userName throws
    // {
    //     const className = "someClass"
    //     const userName = "someUser"
    //     await t.throwsAsync(t.context.got.put(`user/123/class/asd`, requestBody));
    //     await t.throwsAsync(t.context.got.put(`user/asd/class/123`, requestBody));
    // }
})

const test = require('ava')
const app = require('../index.js');
const http = require('http');
const listen = require('test-listen');
const got = require('got');

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

// Replace this with correct endpoints
test("endpoint User", async (t)=>{
    const {body, statusCode} = await t.context.got("user/123");
    t.is(statusCode, 200);
    t.is(body.surname, 'surname');
    t.is(body.name, 'name');
    t.is(body.id, 0);
    t.is(body.userName, 'userName');
    t.is(body.email, 'email');
})

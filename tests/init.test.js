const test = require('ava')

test('my test', t => {
    t.pass();
    // t.fail();
})

function addNumbers(a, b){
    if (!(typeof a === "number" && typeof b === "number")){
        throw new Error("Bad input types")
    }
    return a + b
}

test("addNumbers", t => {
    t.is(addNumbers(1,2), 3);
    t.throws(() => addNumbers("one", "two"));
})

test("Async", async t => {
    const res = Promise.resolve('test');
    t.is(await res, 'test')
})

// API function testing
const {getUserInfo} = require('../service/DefaultService.js');

test("getUserInfo", async t => {
    const res = await getUserInfo();
    t.is(res.surname, 'surname');
    t.is(res.name, 'name');
    t.is(res.id, 0);
    t.is(res.userName, 'userName');
    t.is(res.email, 'email');

})

// Server testing

const app = require('../index.js');
const http = require('http');
const listen = require('test-listen');
const got = require('got');

test.before(async (t) => {
    console.log("Creating test server")
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json' });
    console.log("Successfully created test server")
})

test.after.always(async (t) => {
    console.log("Testing finished, closing test server")
    await t.context.server.close();
    console.log("Successfully closed test server")

})

test("endpoint User", async (t)=>{
    const {body, statusCode} = await t.context.got("user/123");
    t.is(statusCode, 200);
    t.is(body.surname, 'surname');
    t.is(body.name, 'name');
    t.is(body.id, 0);
    t.is(body.userName, 'userName');
    t.is(body.email, 'email');
})
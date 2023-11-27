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



// test('my test Nick', t => {
//     t.pass();
//     // t.fail();
// })

// API :
//      POST    /admin/user
//      DELETE  /admin/user/{userName}
//      GET     /user/{userName}/class/{className}

test("POST endpoint /admin/user", async (t) => {

    const { statusCode } = await t.context.got.post("admin/user", {
        // Give it dummy data 
        json: {
            surname: "surname_dummy",
            name: "name_dummy",
            id: 0,
            userName: "userName_dummy",
            email: "email@dummy_data"
        }
    });

    // Make sure it was succefull
    t.is(statusCode, 200, "Expected status code 200 for successful post");

});



test("DELETE endpoint /admin/user/{userName}", async (t) => {

    const userNameToDelete = "dummyUserName";     
    const { statusCode } = await t.context.got.delete(`admin/user/${userNameToDelete}`);

    t.is(statusCode, 200, "Expected status code 200 for successful deletion");
   
});

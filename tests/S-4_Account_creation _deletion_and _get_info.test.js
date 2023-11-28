

// This file contains tests for the following
// API :
//      POST    /admin/user
//      DELETE  /admin/user/{userName}
//      GET     /user/{userName}/class/{className}



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





// Test for:    POST    /admin/user
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

    // Check status Code 
    t.is(statusCode, 200, "Expected status code 200 for successful post");

});


// Test for:    DELETE  /admin/user/{userName}
test("DELETE endpoint /admin/user/{userName}", async (t) => {

    const userNameToDelete = "dummyUserName";     
    const { statusCode } = await t.context.got.delete(`admin/user/${userNameToDelete}`);

    // Check status Code 
    t.is(statusCode, 200, "Expected status code 200 for successful deletion");
   
});

// Make mulpuple request for differend users
test("Multipule DELETE endpoint /admin/user/{userName}", async (t) => {
    const usernamesToDelete = ["dummyUserName1", "dummyUserName2", "dummyUserName3"];

    for (const userNameToDelete of usernamesToDelete) {
        const { statusCode } = await t.context.got.delete(`admin/user/${userNameToDelete}`);

        // Check status Code 
        t.is(statusCode, 200, `Expected status code 200 for successful deletion, Bad request for user ${userNameToDelete}`);
    }
    
});



// Test for:    GET     /user/{userName}/class/{className}
test("GET endpoint /user/{userName}/class/{className}", async (t) => {
    const userName = "userName"; 
    const className = "className"; // Don't change that because the dummy data returns only for this className

    const { body, statusCode } = await t.context.got.get(`user/${userName}/class/${className}`);

    // Check status Code    
    t.is(statusCode, 200, "Expected status code 200");

    // Make sure it has a className and it is the expected one
    t.not(body.className, undefined, "Response should have a className property");
    t.is(body.className, className, `Expected className to be equal with that of the request ${className}`);

    // Make sure it is an array and that it has a length
    t.true(Array.isArray(body.users), "Users should be an array");
    t.not(body.users.length,undefined, "Expected to be able to get lenght of users array");

    // Loop over all users in the array
    for (var i = 0 ; i < body.users.length ; i++ ){
        const dummy_user = body.users[i];
        // Check that the struct has the proper fields  
        t.not(dummy_user.grade,          undefined, "User should have a grade property");
        t.not(dummy_user.user,           undefined, "User should have a user property");
        t.not(dummy_user.user.userName,  undefined, "User should have a userName property");
        t.not(dummy_user.user.surname,   undefined, "User should have a surname property");
        t.not(dummy_user.user.name,      undefined, "User should have a name property");
        t.not(dummy_user.user.id,        undefined, "User should have a id property");
        t.not(dummy_user.user.email,     undefined, "User should have a email property");
        
    }

});


// // Test 2 for:    GET     /user/{userName}/class/{className}
// test("GET2 endpoint /user/{userName}/class/{className}", async (t) => {
//     const userName = "userName"; 
//     const className = "className"; // Don't change that because the dummy data returns only for this className
    
//     const { body, statusCode } = await t.context.got.get(`user/${userName}/class/${className}`);

//     const userName2 = "userName2"; 
//     const { body2, statusCode2 } = await t.context.got.get(`user/${userName2}/class/${className}`);

//     // Check status Code    
//     t.is(statusCode, 200, "Expected status code 200");
//     t.is(statusCode2, 200, "Expected status code 200");

//     t.deepEqual(body2,body, "Expected same body response for all users")

//     // Make sure it has a className and it is the expected one
//     t.not(body.className, undefined, "Response should have a className property");
//     t.is(body.className, className, `Expected className to be equal with that of the request ${className}`);

//     // Make sure it is an array and that it has a length
//     t.true(Array.isArray(body.users), "Users should be an array");
//     t.not(body.users.length,undefined, "Expected to be able to get lenght of users array");

//     // Loop over all users in the array
//     for (var i = 0 ; i < body.users.length ; i++ ){
//         const dummy_user = body.users[i];
//         // Check that the struct has the proper fields  
//         t.not(dummy_user.grade,          undefined, "User should have a grade property");
//         t.not(dummy_user.user,           undefined, "User should have a user property");
//         t.not(dummy_user.user.userName,  undefined, "User should have a userName property");
//         t.not(dummy_user.user.surname,   undefined, "User should have a surname property");
//         t.not(dummy_user.user.name,      undefined, "User should have a name property");
//         t.not(dummy_user.user.id,        undefined, "User should have a id property");
//         t.not(dummy_user.user.email,     undefined, "User should have a email property");
        
//     }

// });
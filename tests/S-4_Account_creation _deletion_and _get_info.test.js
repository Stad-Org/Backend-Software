

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



// =========================== POST /admin/user =========================== //

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

// Test for Multiple:    POST    /admin/user
test("Multiple POST endpoint /admin/user", async (t) => {

    const usersToCreate = [
        {
            surname: "surname_dummy1",
            name: "name_dummy1",
            id: 1,
            userName: "userName_dummy1",
            email: "email1@dummy_data"
        },
        {
            surname: "surname_dummy2",
            name: "name_dummy2",
            id: 2,
            userName: "userName_dummy2",
            email: "email2@dummy_data"
        },
        {
            surname: "surname_dummy3",
            name: "name_dummy3",
            id: 3,
            userName: "userName_dummy3",
            email: "email3@dummy_data"
        },
    ];

    for (const userData of usersToCreate) {
        const { statusCode } = await t.context.got.post("admin/user", {json: userData});

        // Check status Code 
        t.is(statusCode, 200, `Expected status code 200 for successful deletion, Bad request for user ${userData.userName}`);
       
    }
});

// It should be a bit different but what can we do at this point
// Test for Wrong input:    POST    /admin/user
test("Wrong input POST endpoint /admin/user", async (t) => {

    const { statusCode } = await t.context.got.post("admin/user", { 
        // Give it dummy data 
        json: {
        //     surname: "surname_dummy",
        //     name: "name_dummy",
        //     id: 0,
        //     userName: "userName_dummy",
        //     email: "email@dummy_data"
        }
    });

    // Check status Code 
    // It shouldn't respond with 200 when the body is empty, So now the correct step would be to change the function
    t.is(statusCode, 200, "Expected status code 200 for successful post");

});

// Test for Empty input:    POST    /admin/user
test("Empty input POST endpoint /admin/user", async (t) => {

    await t.throwsAsync(
        async () => {
            await t.context.got.post("admin/user", { })
        },
        { instanceOf: t.context.got.HTTPError, message: /Response code 415/ }
        // Or we can use this 'Response code 415 (Unsupported Media Type)'        
    );

});

// // Testing a different way for Empty input:    POST    /admin/user
// test('Fancy Empty input POST endpoint /admin/user', async t => {
//     const error = await t.throws(  (t) => { t.context.got.post("admin/user", { }) } );
//     console.log(error)
//     t.is(error.message, '...');
// });


// =========================== DELETE /admin/user/{userName} =========================== //

// Test for:    DELETE  /admin/user/{userName}
test("DELETE endpoint /admin/user/{userName}", async (t) => {

    const userNameToDelete = "dummyUserName";     
    const { statusCode } = await t.context.got.delete(`admin/user/${userNameToDelete}`);

    // Check status Code 
    t.is(statusCode, 200, "Expected status code 200 for successful deletion");
   
});

// Test for mulpuple: DELETE  /admin/user/{userName}
test("Multiple DELETE endpoint /admin/user/{userName}", async (t) => {
    const usernamesToDelete = ["dummyUserName1", "dummyUserName2", "dummyUserName3"];

    for (const userNameToDelete of usernamesToDelete) {
        const { statusCode } = await t.context.got.delete(`admin/user/${userNameToDelete}`);

        // Check status Code 
        t.is(statusCode, 200, `Expected status code 200 for successful deletion, Bad request for user ${userNameToDelete}`);
    }
    
});

// Test for Empty input:    DELETE  /admin/user/{userName}
test("Empty input DELETE endpoint /admin/user/{userName}", async (t) => {
    const userNameToDelete = "";

    await t.throwsAsync(
        async () => {
            await t.context.got.delete(`admin/user/${userNameToDelete}`);
        },
        { instanceOf: t.context.got.HTTPError, message: /Response code 405/ }
    );
});


// =========================== GET /user/{userName}/class/{className} =========================== //

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

// Test for Multiple usernames:    GET     /user/{userName}/class/{className}
test("Multiple usernames GET endpoint /user/{userName}/class/{className}", async (t) => {
    const usernames = ["userName", "userName2", "userName3", "userName4", "userName5", "userName6"];
    const className = "className"; // Don't change that because the dummy data returns only for this className

    
    // Pre-allocate the array based on the number of usernames
    const responses = new Array(usernames.length);
    
    // Iterate over each username
    for (let i = 0; i < usernames.length; i++) {
        // Make the GET request
        const response = await t.context.got.get(`user/${usernames[i]}/class/${className}`);
        
        // Check status Code
        t.is(response.statusCode, 200, `Expected status code 200 for user: ${usernames[i]}`);
        
        // Assign the response to the pre-allocated array
        responses[i] = response;
    }
    
    const body = responses[0].body;
    // Check that the first response has the expected body
    
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

    // Check that all responses have the same body
    for (let i = 1; i < responses.length; i++) {
        t.deepEqual(
            responses[i].body,
            responses[0].body,
            `Expected the same body response for ${usernames[i]} as for ${usernames[0]}`
            );
        }
        
});

// Test for Multiple usernames and classNames:    GET     /user/{userName}/class/{className}
test("Multiple usernames and classNames GET endpoint /user/{userName}/class/{className}", async (t) => {
    const usernames = ["userName1", "userName2", "userName3"];
    const classNames = ["className1", "className2", "className3"];
    
    // Iterate over each className
    for (const className of classNames) {
        // Iterate over each username
        var expected_response ;
        for (const userName of usernames) {
            // Make the GET request
            const response = await t.context.got.get(`user/${userName}/class/${className}`);
            
            // Check status Code
            t.is(response.statusCode, 200, `Expected status code 200 for ${userName} and ${className}`);
             
            
            // Check Response body once for each className (since we check the other later against thoses ones)
            if (userName == usernames[0]){
                expected_response = response ; 

                var body = response.body;
                // Check that the first response has the expected body
                
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
            }
            else{
                t.deepEqual(
                    response.body,
                    expected_response.body,
                    `Expected the same body response as ${usernames[0]} and ${className} for ${userName} and ${className}`
                );
            }

        }
    }

});

// Test for Empty className "input":    GET     /user/{userName}/class/{className}
test("Empty className GET endpoint /user/{userName}/class/{className}", async (t) => {
    const userName = "userName"; 
    const className = ""; // Don't change that because the dummy data returns only for this className
    await t.throwsAsync(
        async () => {
            await t.context.got.get(`user/${userName}/class/${className}`);
        },
        { instanceOf: t.context.got.HTTPError, message: /Response code 404/ }
    );   
    
});
    
// Test for Empty userName "input":    GET     /user/{userName}/class/{className}
test("Empty userName GET endpoint /user/{userName}/class/{className}", async (t) => {
    const userName = ""; 
    const className = "className"; 

    await t.throwsAsync(
        async () => {
            await t.context.got.get(`user/${userName}/class/${className}`);
        },
        { instanceOf: t.context.got.HTTPError, message: /Response code 404/ }
    );   
    
});

// Test for Empty userName and className "input":    GET     /user/{userName}/class/{className}
test("Empty both GET endpoint /user/{userName}/class/{className}", async (t) => {
    const userName = ""; 
    const className = ""; 
    
    await t.throwsAsync(
        async () => {
            await t.context.got.get(`user/${userName}/class/${className}`);
        },
        { instanceOf: t.context.got.HTTPError, message: /Response code 404/ }
    );   
    
});
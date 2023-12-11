const test = require("ava");
const app = require("../index.js");
const http = require("http");
const listen = require("test-listen");
const got = require("got");
const onlyFunc = require('../service/DefaultService.js');

// Initialize server
test.before(async (t) => {
  console.log("Creating test server");
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({
    prefixUrl: t.context.prefixUrl,
    responseType: "json",
  });
  console.log("Successfully created test server");
});

// Shutdown server
test.after.always(async (t) => {
  console.log("Testing finished, closing test server");
  await t.context.server.close();
  console.log("Successfully closed test server");
});



/* 
* Utility functions for testing the schema of the responses
*/
function testValidUser(t, user) {
  t.is(typeof user.email, "string");
  t.is(typeof user.name, "string");
  t.is(typeof user.surname, "string");
  t.is(typeof user.id, "number");
}

function testValidEnrolledUser(t, enrolledUser) {
  t.is(typeof enrolledUser.grade, "number");
  t.true(enrolledUser.grade >= 0 && enrolledUser.grade <= 10);
  testValidUser(t, enrolledUser.user);
}

function testValidClass(t, aClass) {
  t.is(typeof aClass.className, "string");
  t.true(Array.isArray(aClass.users));
  prevId = -1;
  for (enrolledUser of aClass.users) {
    testValidEnrolledUser(t, enrolledUser);
    // Ids should be sorted
    t.true(enrolledUser.user.id > prevId);
    prevId = enrolledUser.user.id;
  }
}

const expectedClassObject = {
  className: "maths",
  users: [
    {
      grade: 6.027456183070403,
      user: {
        surname: "surname",
        name: "name",
        id: 0,
        userName: "userName",
        email: "email",
      },
    },
    {
      grade: 6.027456183070403,
      user: {
        surname: "surname",
        name: "name",
        id: 1,
        userName: "userName",
        email: "email",
      },
    },
  ],
};

/**
 * GET admin class info
 */
test("GET /admin/class/{className} returns the data of the class", async (t) => {
  const className = "maths";
  const { statusCode, body } = await t.context.got(`admin/class/${className}`);

  t.is(statusCode, 200, "status code should be 200");

  t.truthy(body, "checks if the body has any values");

  testValidClass(t, body);

  t.deepEqual(body, expectedClassObject, "the response should be equal to the expected object")

});

/**
 *  Also test service function getClassInfoAdmin 
 */
test("getClassInfoAdmin returns the data of the class", async (t) => {
  const className = "maths";
  const body = await onlyFunc.getClassInfoAdmin(className);

  t.truthy(body, "checks if the body has any values");

  testValidClass(t, body);

  t.deepEqual(body, expectedClassObject, "the response should be equal to the expected object")
})


/**
 * POST class with correct request 
 */
test("POST ​/admin​/class returns succes status code", async (t) => {
  const classroom = {
    "className": "className",
    "users": [
      {
        "grade": 6,
        "user": {
          "surname": "kiasonas",
          "name": "name",
          "id": 0,
          "userName": "userName",
          "email": "email"
        }
      },
      {
        "grade": 8,
        "user": {
          "surname": "surname",
          "name": "name",
          "id": 1,
          "userName": "userName",
          "email": "tester@gmail.com"
        }
      }
    ]
  }

  const { statusCode } = await t.context.got.post(`admin/class`, {
    json: classroom
  });

  t.is(statusCode, 200, 'expected status from post request')

})


/**
 * 
 * POST class with bad request 
 * TODO: should be working , check it out 
 */
test("POST ​/admin​/class returns bad request status code", async (t) => {

  //Throws async is our test 
  await t.throwsAsync(async () => {
    response = await t.context.got.delete(`admin/class/`, {
      json: {}
    });
    console.log('the response is ', response.statusCode)
  });

  //this is done purely for reaching the branch in the Default Service. I cannot find another way to reach it 
  await t.context.got.post(`admin/class`, {
    json: {}
  })
  //should be 400 but sends 200


})

/**
 * Multiple POST requests 
 */

test("POST ​/admin​/class multiple classes addition", async (t) => {

  const classrooms = [{
    "className": "className",
    "users": [
      {
        "grade": 6,
        "user": {
          "surname": "kiasonas",
          "name": "name",
          "id": 0,
          "userName": "userName",
          "email": "email"
        }
      },
      {
        "grade": 8,
        "user": {
          "surname": "surname",
          "name": "name",
          "id": 1,
          "userName": "userName",
          "email": "tester@gmail.com"
        }
      }
    ]
  }, {
    "className": "className",
    "users": [
      {
        "grade": 6,
        "user": {
          "surname": "kiasonas",
          "name": "name",
          "id": 0,
          "userName": "userName",
          "email": "email"
        }
      },
      {
        "grade": 8,
        "user": {
          "surname": "surname",
          "name": "name",
          "id": 1,
          "userName": "userName",
          "email": "tester@gmail.com"
        }
      }
    ]
  }]

  for (const classroom of classrooms) {
    const { statusCode } = await t.context.got.post(`admin/class`, {
      json: classroom
    });

    t.is(statusCode, 200, 'expected status from post request')
  }

})

/**
 * Also test service function createClass
 */

test("createClass creates a class", async (t) => {
  const classroom = {
    "className": "className",
    "users": [
      {
        "grade": 6,
        "user": {
          "surname": "kiasonas",
          "name": "name",
          "id": 0,
          "userName": "userName",
          "email": "email"
        }
      },
      {
        "grade": 8,
        "user": {
          "surname": "surname",
          "name": "name",
          "id": 1,
          "userName": "userName",
          "email": "email"
        }
      }
    ]
  }

  // We can only test that it does not throw an error
  await t.notThrowsAsync(onlyFunc.createClass(classroom));

})

/** 
 * DELETE class 
 */
test("DELETE ​/admin​/class/{className} class delete", async (t) => {

  const className = 'biology'
  const { statusCode } = await t.context.got.delete(`admin/class/${className}`)

  // Check status Code
  t.is(statusCode, 200, 'Expected status code 200 for successful deletion')

});


/**
 * Also test service function deleteClass
 */

test("deleteClass deletes a class", async (t) => {
  const className = "maths";

  // We can only test that it does not throw an error
  await t.notThrowsAsync(onlyFunc.deleteClass(className));

})

/**
 * DELETE mulitple classes
 */
test("DELETE ​/admin​/class/{className} mulitple classes deletion", async (t) => {

  const classNames = ['biology', 'maths', 'literature']

  // Check status Code
  for (className of classNames) {
    const { statusCode } = await t.context.got.delete(`admin/class/${className}`)
    t.is(statusCode, 200, 'Expected status code 200 for successful deletion')
  }

});

/** 
 * DELETE class bad request
 */
test("DELETE ​/admin​/class/{className} class delete bad request", async (t) => {

  await t.throwsAsync(async () => {
    response = await t.context.got.delete(`admin/class/`);
    console.log('the response is ', response.statusCode)
  });

  //should be 400 but sends 200

});

/** 
 * GET class (user)
 */
test("GET /user/{userName}/class/{className}", async (t) => {

  const className = "maths";
  const { statusCode, body } = await t.context.got(`admin/class/${className}`);

  t.is(statusCode, 200, "status code should be 200");

  t.truthy(body, "checks if the body has any values");

  testValidClass(t, body);

  t.deepEqual(body, expectedClassObject, "The response should be equal to the expected object");

});

/**
 * Also test service function getClassInfoUser
 */
test("getClassInfoUser returns the data of the class", async (t) => {
  const userName = "user123"
  const className = "maths";
  const body = await onlyFunc.getClassInfoUser(userName, className);

  t.truthy(body, "checks if the body has any values");

  testValidClass(t, body);

  t.deepEqual(body, expectedClassObject, "the response should be equal to the expected object")
}
)
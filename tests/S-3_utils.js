
const test = require("ava");

/**
* Test User schema
*/
function testValidUser(t, user) {
    t.is(typeof user.email, "string");
    t.is(typeof user.name, "string");
    t.is(typeof user.surname, "string");
    t.is(typeof user.id, "number");
  }
  
  /**
   * Test EnrolledUser schema
  */
  function testValidEnrolledUser(t, enrolledUser) {
    t.is(typeof enrolledUser.grade, "number");
    t.true(enrolledUser.grade >= 0 && enrolledUser.grade <= 10);
    testValidUser(t, enrolledUser.user);
  }
  
  /**
   * Test Class schema
   */
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
  
  /**
   * This is the expected response for the GET requests
   */
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
   * These are some Classes to test class creation POST request
   */
  const exampleClassObjects = [{
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
  
// Export 
module.exports = {
    testValidUser,
    testValidEnrolledUser,
    testValidClass,
    expectedClassObject,
    exampleClassObjects
}

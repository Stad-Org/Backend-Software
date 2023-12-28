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
  
  
  
  module.exports = {
    expectedClassObject,
    exampleClassObjects
  }
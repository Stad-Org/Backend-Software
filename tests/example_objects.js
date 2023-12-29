// This file contains example objects for testing

// Example Class object
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


// Example Class objects
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
  expectedClassObject,
  exampleClassObjects
}


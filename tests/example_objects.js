/**
 * Represents the expected structure of a user object with sample data.
 * @typedef {Object} User
 * @property {string} surname - The surname of the user.
 * @property {string} name - The name of the user.
 * @property {number} id - The unique identifier of the user.
 * @property {string} userName - The username of the user.
 * @property {string} email - The email address of the user.
 */

/**
 * Represents the expected structure of a class object with sample data.
 * @typedef {Object} ClassObject
 * @property {string} className - The name of the class.
 * @property {Array<User>} users - An array of user objects.
 */

/**
 * The expectedClassObject represents a sample class object structure with placeholder data.
 * @type {ClassObject}
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
 * These are some Classes to test class creation POST request.
 * @type {Array<ClassObject>}
 */
const exampleClassObjects = [
  {
    className: "className",
    users: [
      {
        grade: 6,
        user: {
          surname: "kiasonas",
          name: "name",
          id: 0,
          userName: "userName",
          email: "email",
        },
      },
      {
        grade: 8,
        user: {
          surname: "surname",
          name: "name",
          id: 1,
          userName: "userName",
          email: "tester@gmail.com",
        },
      },
    ],
  },
  {
    className: "className",
    users: [
      {
        grade: 6,
        user: {
          surname: "kiasonas",
          name: "name",
          id: 0,
          userName: "userName",
          email: "email",
        },
      },
      {
        grade: 8,
        user: {
          surname: "surname",
          name: "name",
          id: 1,
          userName: "userName",
          email: "tester@gmail.com",
        },
      },
    ],
  },
];

/**
 * Exports the expectedClassObject and exampleClassObjects for use in other modules.
 * @module TestData
 */
module.exports = {
  expectedClassObject,
  exampleClassObjects,
};

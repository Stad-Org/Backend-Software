// Example file for writing tests
//const onlyFunc = require('../service/DefaultService.js');
const test = require("ava");

/**
 * Simple pass or fail test
 */
test("my test", (t) => {
  t.pass();
  // t.fail();
});

test("Simple addition", (t) => {
  const num = 2;
  t.is(num + 1, 3);
});

/**
 *
 * @param {Number} a first number of addition
 * @param {Number} b seconf number of addition
 * @returns sumof the 2 numbers
 */
function addNumbers(a, b) {
  if (!(typeof a === "number" && typeof b === "number")) {
    throw new Error("Bad input types");
  }
  return a + b;
}

test("addNumbers", (t) => {
  t.plan(2); // How many tests i plan to make

  t.is(addNumbers(1, 2), 3);
  t.throws(() => addNumbers("one", "two"));
});

// test("Async", async (t) => {
//   const res = Promise.resolve("test");
//   t.is(await res, "test");
// });

// API function testing
// const { getUserInfo } = require("../service/DefaultService.js");

// test("getUserInfo", async (t) => {
//   const res = await getUserInfo();
//   t.is(res.surname, "surname");
//   t.is(res.name, "name");
//   t.is(res.id, 0);
//   t.is(res.userName, "userName");
//   t.is(res.email, "email");
// });


// 1. 
const test = require('ava')
const app = require('../index.js')
const http = require('http')
const listen = require('test-listen')
const got = require('got')
const func = require('../service/DefaultService.js');


// 2. 
// Initialize server
test.before(async (t) => {
    console.log('Creating test server')
    t.context.server = http.createServer(app)
    t.context.prefixUrl = await listen(t.context.server)
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json' })
    console.log('Successfully created test server')
})

// Shutdown server
test.after.always(async (t) => {
    console.log('Testing finished, closing test server')
    await t.context.server.close()
    console.log('Successfully closed test server')
})

  
// GET 

test('booksGET function', async (t) =>{
    const body = await func.booksGET();
    console.log(body);
    t.is(body.length, 2);
    t.is(body[0].title, 'title');

})

test('GET /books', async (t) =>{
    const { body, statusCode } = await t.context.got.get(`books`);
    t.is(body.length, 2);
    t.is(statusCode, 200);

})

// POST 

test('booksPOST function', async (t) => {
    const book = {
        author : "author_test",
        isbn : "isbn_test",
        available : true,
        id : 0,
        title : "title_test"
    }
    // Check that the function does NOT throw an error
    await t.notThrowsAsync(async () => {
        await func.booksPOST(book);
    });
})

test('POST books', async (t) => {

    const {statusCode} = await t.context.got.post(`books`, {
        json: {
            author : "author_test",
            isbn : "isbn_test",
            available : true,
            id : 0,
            title : "title_test"
        }
    })

    t.is(statusCode, 200);
})


// PUT 

test('usersUserIdPUT function', async (t) => {
    const new_info = 
        {
            name: "new_name",
            email: "new_email"
          }
    await t.notThrowsAsync(async() =>{
        await func.usersUserIdPUT(new_info);
    });
})


test('PUT users id', async (t) => {
    const userId = 1;
   
    const {statusCode} = await t.context.got.put(`users/${userId}`, )
    t.is(statusCode, 200);
})


// DELETE 

test('booksBookIdDELETE function', async (t) => {
    const bookId = "1";
    await t.notThrowsAsync(func.booksBookIdDELETE(bookId));

})

test('DELETE /books/{bookId}', async (t) => {
    const bookId = 0;

    const {statusCode} = await t.context.got.delete(`books/${bookId}`)
    t.is(statusCode, 200);
})

  



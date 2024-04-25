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
 
// Export 
module.exports = {
    testValidUser,
    testValidEnrolledUser,
    testValidClass
}

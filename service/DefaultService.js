'use strict';


/**
 * create a class
 * the secretary must be able to create a class
 *
 * body Class Class model
 * no response value expected for this operation
 **/
exports.createClass = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Create a new user account
 *
 * body User user model
 * no response value expected for this operation
 **/
exports.createUser = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * delete class
 *
 * className String the name of the class
 * no response value expected for this operation
 **/
exports.deleteClass = function(className) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * delete a message
 *
 * userName String the name of the user
 * className String the name of the class
 * messageID String the id of the message
 * no response value expected for this operation
 **/
exports.deleteMessage = function(userName,className,messageID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * delete a user
 *
 * userName String The user name for deletetion
 * no response value expected for this operation
 **/
exports.deleteUser = function(userName) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * edit the user details
 *
 * body User user model
 * userName String the name of the user
 * no response value expected for this operation
 **/
exports.editUserInfo = function(body,userName) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * get the chat of the classroom
 * F2- Ο χρήστης θα πρέπει να έχει τη δυνατότητα να συνομιλήσει με τα υπόλοιπα μέλη της ‘τάξης’
 *
 * userName String the name of the user
 * className String the name of the class
 * returns Chat
 **/
exports.getClassChat = function(userName,className) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ "", "" ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * get class info
 * FR1 Ο καθηγητής και η γραμματεία πρέπει να μπορεί να επεξεργαστεί την τάξη
 *
 * className String the name of the class
 * returns Class
 **/
exports.getClassInfoAdmin = function(className) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "className" : "className",
  "users" : [ {
    "grade" : 6.027456183070403,
    "user" : {
      "surname" : "surname",
      "name" : "name",
      "id" : 0,
      "userName" : "userName",
      "email" : "email"
    }
  }, {
    "grade" : 6.027456183070403,
    "user" : {
      "surname" : "surname",
      "name" : "name",
      "id" : 0,
      "userName" : "userName",
      "email" : "email"
    }
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * get class info
 * FR1 Ο καθηγητής και η γραμματεία πρέπει να μπορεί να επεξεργαστεί την τάξη
 *
 * userName String the name of the user
 * className String the name of the class
 * returns Class
 **/
exports.getClassInfoUser = function(userName,className) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "className" : `${className}`,
  "users" : [ {
    "grade" : 6.027456183070403,
    "user" : {
      "surname" : "surname",
      "name" : "name",
      "id" : 0,
      "userName" : "userName",
      "email" : "email"
    }
  }, {
    "grade" : 6.027456183070403,
    "user" : {
      "surname" : "surname",
      "name" : "name",
      "id" : 0,
      "userName" : "userName",
      "email" : "email"
    }
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * get the grade of the user
 * F4- Το σύστημα θα πρέπει να μπορεί να υπολογίσει τον μέσο όρο του μαθητή
 *
 * userName String the name of the user
 * className String the name of the class
 * returns Grade
 **/
exports.getUserGrade = function(userName,className) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "grade" : 0.8008281904610115,
  "className" : className,
  "userName" : userName
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * get the user details
 * FR-3 Ο χρήστης θα μπορεί να φτιάξει το προφίλ του
 *
 * userName String the name of the user
 * returns User
 **/
exports.getUserInfo = function(userName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "surname" : "surname",
  "name" : "name",
  "id" : 0,
  "userName" : "userName",
  "email" : "email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * post a message to the classroom
 *
 * body NewMessage message model
 * userName String the name of the user
 * className String the name of the class
 * no response value expected for this operation
 **/
exports.postClassMessage = function(body,userName,className) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * change class info
 *
 * body Class Class model
 * userName String the name of the user
 * className String the name of the class
 * no response value expected for this operation
 **/
exports.putClassInfouser = function(body,userName,className) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * change class info
 *
 * body Class Class model
 * className String the name of the class
 * no response value expected for this operation
 **/
exports.putClassInfoAdmin = function(body,className) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * upload student grades in tests
 *
 * body Grade grade model
 * userName String the name of the user
 * className String the name of the class
 * no response value expected for this operation
 **/
exports.uploadUserGrade = function(body,userName,className) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


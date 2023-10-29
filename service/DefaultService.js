'use strict';


/**
 * upload student tests
 * allows the admin to upload student tests
 *
 * body Test Test file
 * userName String the name of the user
 * className String the name of the class
 * no response value expected for this operation
 **/
exports.adminClassClassNameUserUserNameTestsPOST = function(body,userName,className) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * upload exercises
 * the teacher wants to upload exercises
 *
 * body ExerciseSolutionUpload  (optional)
 * userName String the name of the user
 * className String the name of the class
 * no response value expected for this operation
 **/
exports.classClassNameUserUserNameExercisesPOST = function(body,userName,className) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * upload notes
 * the teacher wants to upload notes
 *
 * body NoteUpload note model
 * userName String the name of the user
 * className String the name of the class
 * no response value expected for this operation
 **/
exports.classClassNameUserUserNameNotesPOST = function(body,userName,className) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


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
 * body User message model
 * no response value expected for this operation
 **/
exports.createUser = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * delete a certain notification
 *
 * notificationId Long the name id of the notification
 * no response value expected for this operation
 **/
exports.deleteAdminNotificationById = function(notificationId) {
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
 * edit a certain notification
 * F5- Το σύστημα θα πρέπει να ειδοποιεί τον χρήστη για νέες ειδοποιήσεις
 *
 * body NewNotification notification model
 * notificationId Long the name id of the notification
 * no response value expected for this operation
 **/
exports.editAdminNotificationById = function(body,notificationId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * edit the user details
 *
 * body User message model
 * userName String the name of the user
 * no response value expected for this operation
 **/
exports.editUserInfo = function(body,userName) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * edit the role of the user
 * the admin must be able to edit the roles of the users
 *
 * body Role  (optional)
 * userName Long the name id of the notification
 * no response value expected for this operation
 **/
exports.editUserRole = function(body,userName) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * upload exercises solution
 * the student wants to upload exercises' solutions
 *
 * body ExerciseSolutionUpload  (optional)
 * userName String the name of the user
 * subjectName String the name of the class
 * no response value expected for this operation
 **/
exports.exerciseSolution = function(body,userName,subjectName) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * get a certain notification
 * F5- Το σύστημα θα πρέπει να ειδοποιεί τον χρήστη για νέες ειδοποιήσεις
 *
 * notificationId Long the name id of the notification
 * returns Notification
 **/
exports.getAdminNotificationById = function(notificationId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * get all the notifications
 * F5- Το σύστημα θα πρέπει να ειδοποιεί τον χρήστη για νέες ειδοποιήσεις
 *
 * returns Notifications
 **/
exports.getAdminNotifications = function() {
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
  "className" : "className",
  "username" : "username"
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
 * get a notification of the user using its id
 * F5- Το σύστημα θα πρέπει να ειδοποιεί τον χρήστη για νέες ειδοποιήσεις
 *
 * userName String the name of the user
 * notificationId Long the name id of the notification
 * returns Notification
 **/
exports.getUserNotificationById = function(userName,notificationId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * get the notifications of the user
 * F5- Το σύστημα θα πρέπει να ειδοποιεί τον χρήστη για νέες ειδοποιήσεις
 *
 * userName String the name of the user
 * returns Notifications
 **/
exports.getUserNotifications = function(userName) {
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
 * upload exercises grade
 * the teacher wants to upload exercises' grade
 *
 * body ExerciseGradeUpload  (optional)
 * userName String the name of the user
 * className String the name of the class
 * exerciseId String the name of the class
 * no response value expected for this operation
 **/
exports.gradeExercise = function(body,userName,className,exerciseId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Logs user into the system
 *
 * username String The user name for login
 * password String The password for login in clear text
 * no response value expected for this operation
 **/
exports.loginUser = function(username,password) {
  return new Promise(function(resolve, reject) {
    resolve();
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
 * post a notification
 *
 * body NewNotification notification model
 * no response value expected for this operation
 **/
exports.postNotification = function(body) {
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
 * update the schedule
 * the admin must be able to edit the schedule
 *
 * body ScheduleItemUpload  (optional)
 * className String the name of the class
 * no response value expected for this operation
 **/
exports.updateSchedule = function(body,className) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * upload student grades in tests
 *
 * body Grade notification model
 * userName String the name of the user
 * className String the name of the class
 * no response value expected for this operation
 **/
exports.uploadUserGrade = function(body,userName,className) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


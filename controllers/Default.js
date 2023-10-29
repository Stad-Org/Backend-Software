'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.adminClassClassNameUserUserNameTestsPOST = function adminClassClassNameUserUserNameTestsPOST (req, res, next, body, userName, className) {
  Default.adminClassClassNameUserUserNameTestsPOST(body, userName, className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.classClassNameUserUserNameExercisesPOST = function classClassNameUserUserNameExercisesPOST (req, res, next, body, userName, className) {
  Default.classClassNameUserUserNameExercisesPOST(body, userName, className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.classClassNameUserUserNameNotesPOST = function classClassNameUserUserNameNotesPOST (req, res, next, body, userName, className) {
  Default.classClassNameUserUserNameNotesPOST(body, userName, className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createClass = function createClass (req, res, next, body) {
  Default.createClass(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createUser = function createUser (req, res, next, body) {
  Default.createUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteAdminNotificationById = function deleteAdminNotificationById (req, res, next, notificationId) {
  Default.deleteAdminNotificationById(notificationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteClass = function deleteClass (req, res, next, className) {
  Default.deleteClass(className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUser = function deleteUser (req, res, next, userName) {
  Default.deleteUser(userName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editAdminNotificationById = function editAdminNotificationById (req, res, next, body, notificationId) {
  Default.editAdminNotificationById(body, notificationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editUserInfo = function editUserInfo (req, res, next, body, userName) {
  Default.editUserInfo(body, userName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editUserRole = function editUserRole (req, res, next, body, userName) {
  Default.editUserRole(body, userName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.exerciseSolution = function exerciseSolution (req, res, next, body, userName, subjectName) {
  Default.exerciseSolution(body, userName, subjectName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAdminNotificationById = function getAdminNotificationById (req, res, next, notificationId) {
  Default.getAdminNotificationById(notificationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAdminNotifications = function getAdminNotifications (req, res, next) {
  Default.getAdminNotifications()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getClassChat = function getClassChat (req, res, next, userName, className) {
  Default.getClassChat(userName, className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getClassInfoAdmin = function getClassInfoAdmin (req, res, next, className) {
  Default.getClassInfoAdmin(className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getClassInfoUser = function getClassInfoUser (req, res, next, userName, className) {
  Default.getClassInfoUser(userName, className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserGrade = function getUserGrade (req, res, next, userName, className) {
  Default.getUserGrade(userName, className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserInfo = function getUserInfo (req, res, next, userName) {
  Default.getUserInfo(userName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserNotificationById = function getUserNotificationById (req, res, next, userName, notificationId) {
  Default.getUserNotificationById(userName, notificationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserNotifications = function getUserNotifications (req, res, next, userName) {
  Default.getUserNotifications(userName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.gradeExercise = function gradeExercise (req, res, next, body, userName, className, exerciseId) {
  Default.gradeExercise(body, userName, className, exerciseId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.loginUser = function loginUser (req, res, next, username, password) {
  Default.loginUser(username, password)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postClassMessage = function postClassMessage (req, res, next, body, userName, className) {
  Default.postClassMessage(body, userName, className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postNotification = function postNotification (req, res, next, body) {
  Default.postNotification(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putClassInfouser = function putClassInfouser (req, res, next, body, userName, className) {
  Default.putClassInfouser(body, userName, className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putClassInfoAdmin = function putClassInfoAdmin (req, res, next, body, className) {
  Default.putClassInfoAdmin(body, className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateSchedule = function updateSchedule (req, res, next, body, className) {
  Default.updateSchedule(body, className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.uploadUserGrade = function uploadUserGrade (req, res, next, body, userName, className) {
  Default.uploadUserGrade(body, userName, className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

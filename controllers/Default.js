'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

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

module.exports.deleteClass = function deleteClass (req, res, next, className) {
  Default.deleteClass(className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteMessage = function deleteMessage (req, res, next, userName, className, messageID) {
  Default.deleteMessage(userName, className, messageID)
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

module.exports.editUserInfo = function editUserInfo (req, res, next, body, userName) {
  Default.editUserInfo(body, userName)
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

module.exports.postClassMessage = function postClassMessage (req, res, next, body, userName, className) {
  Default.postClassMessage(body, userName, className)
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

module.exports.uploadUserGrade = function uploadUserGrade (req, res, next, body, userName, className) {
  Default.uploadUserGrade(body, userName, className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

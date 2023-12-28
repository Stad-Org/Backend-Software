'use strict';

// Import necessary utilities and services
var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

/**
 * Creates a new class.
 * This function takes a request object (req), a response object (res), 
 * a next function for middleware, and the body of the request.
 * It calls the 'createClass' function from the 'Default' service with the request body,
 * then returns the response from the service through the 'utils.writeJson' method.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @param {object} body - The body of the request, containing data for the new class.
 */
module.exports.createClass = function createClass (req, res, next, body) {
  Default.createClass(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Creates a new user.
 * Similar to 'createClass', this function takes a request object, a response object,
 * a next function, and the body of the request. It calls the 'createUser' function
 * from the 'Default' service with the request body and handles the service response.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @param {object} body - The body of the request, containing data for the new user.
 */
module.exports.createUser = function createUser (req, res, next, body) {
  Default.createUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Deletes an existing class.
 * This function is responsible for deleting a class. It takes the class name from
 * the request parameters and calls the 'deleteClass' function from the 'Default' service.
 * The response from the service is then handled accordingly.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @param {string} className - The name of the class to be deleted.
 */
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

module.exports.putClassInfoUser = function putClassInfoUser (req, res, next, body, userName, className) {
  Default.putClassInfoUser(body, userName, className)
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

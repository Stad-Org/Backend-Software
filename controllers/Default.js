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

/**
 * Deletes a specific message.
 * This function handles the deletion of a message in a class chat. It requires
 * the username, class name, and message ID to identify the message to be deleted.
 * It then calls the 'deleteMessage' function from the 'Default' service and handles the response.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @param {string} userName - The username of the user who sent the message.
 * @param {string} className - The name of the class where the message was posted.
 * @param {string} messageID - The unique ID of the message to be deleted.
 */
module.exports.deleteMessage = function deleteMessage (req, res, next, userName, className, messageID) {
  Default.deleteMessage(userName, className, messageID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Deletes a user.
 * This function is responsible for deleting a user from the system. It takes
 * the username as a parameter and calls the 'deleteUser' function from the 'Default' service.
 * The response from the service is then processed and returned.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @param {string} userName - The username of the user to be deleted.
 */
module.exports.deleteUser = function deleteUser (req, res, next, userName) {
  Default.deleteUser(userName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Edits user information.
 * This function allows for updating a user's information. It requires the updated
 * user information in the request body and the username of the user whose information
 * is being edited. It calls the 'editUserInfo' function from the 'Default' service.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @param {object} body - The updated information of the user.
 * @param {string} userName - The username of the user whose information is being edited.
 */
module.exports.editUserInfo = function editUserInfo (req, res, next, body, userName) {
  Default.editUserInfo(body, userName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Retrieves class chat.
 * This function fetches the chat history of a specified class. It requires the
 * username of the user accessing the chat and the class name. It calls the 'getClassChat'
 * function from the 'Default' service to retrieve the chat data.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @param {string} userName - The username of the user accessing the chat.
 * @param {string} className - The name of the class whose chat is being accessed.
 */
module.exports.getClassChat = function getClassChat (req, res, next, userName, className) {
  Default.getClassChat(userName, className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Retrieves class information for administrators.
 * This function is designed for administrators to get detailed information about a class.
 * It takes the class name as a parameter and calls the 'getClassInfoAdmin' function from
 * the 'Default' service to obtain the relevant data.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @param {string} className - The name of the class whose information is being requested.
 */
module.exports.getClassInfoAdmin = function getClassInfoAdmin (req, res, next, className) {
  Default.getClassInfoAdmin(className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Retrieves class information for a specific user.
 * This function fetches information about a class from a user's perspective. It requires
 * the username of the user and the name of the class. The 'getClassInfoUser' function from
 * the 'Default' service is called to get the information.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @param {string} userName - The username of the user requesting the information.
 * @param {string} className - The name of the class for which information is requested.
 */
module.exports.getClassInfoUser = function getClassInfoUser (req, res, next, userName, className) {
  Default.getClassInfoUser(userName, className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Retrieves the grade of a user in a specific class.
 * This function is responsible for fetching the grade of a user for a given class.
 * It takes the username and class name as parameters and calls the 'getUserGrade'
 * function from the 'Default' service.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @param {string} userName - The username of the user.
 * @param {string} className - The name of the class.
 */
module.exports.getUserGrade = function getUserGrade (req, res, next, userName, className) {
  Default.getUserGrade(userName, className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Retrieves information about a user.
 * This function fetches detailed information about a user. It requires the username
 * as a parameter and calls the 'getUserInfo' function from the 'Default' service.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @param {string} userName - The username of the user whose information is requested.
 */
module.exports.getUserInfo = function getUserInfo (req, res, next, userName) {
  Default.getUserInfo(userName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Posts a message in a class chat.
 * This function allows a user to post a message in a class chat. It requires the message
 * details in the request body, along with the username of the user posting the message and
 * the class name. The 'postClassMessage' function from the 'Default' service is called to handle the posting.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @param {object} body - The content of the message to be posted.
 * @param {string} userName - The username of the user posting the message.
 * @param {string} className - The name of the class where the message is to be posted.
 */
module.exports.postClassMessage = function postClassMessage (req, res, next, body, userName, className) {
  Default.postClassMessage(body, userName, className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Updates class information from a user's perspective.
 * This function is used to update the information of a class as viewed by a user.
 * It takes the updated class information in the request body, along with the username
 * and class name. The 'putClassInfoUser' function from the 'Default' service is called for the update.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @param {object} body - The updated class information.
 * @param {string} userName - The username of the user updating the information.
 * @param {string} className - The name of the class being updated.
 */
module.exports.putClassInfoUser = function putClassInfoUser (req, res, next, body, userName, className) {
  Default.putClassInfoUser(body, userName, className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Updates class information from an administrator's perspective.
 * This function allows an administrator to update the details of a class. It requires
 * the updated class information in the request body and the class name. The 'putClassInfoAdmin'
 * function from the 'Default' service is used for the update.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @param {object} body - The updated information for the class.
 * @param {string} className - The name of the class being updated.
 */
module.exports.putClassInfoAdmin = function putClassInfoAdmin (req, res, next, body, className) {
  Default.putClassInfoAdmin(body, className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Uploads or updates a user's grade for a class.
 * This function handles the uploading or updating of a user's grade for a specific class.
 * It takes the grade details in the request body, along with the username and class name.
 * The 'uploadUserGrade' function from the 'Default' service is called for this purpose.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @param {object} body - The grade details to be uploaded or updated.
 * @param {string} userName - The username of the user whose grade is being uploaded/updated.
 * @param {string} className - The name of the class for which the grade is relevant.
 */
module.exports.uploadUserGrade = function uploadUserGrade (req, res, next, body, userName, className) {
  Default.uploadUserGrade(body, userName, className)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

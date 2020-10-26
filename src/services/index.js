const users = require('./users/users.service.js');
const messages = require('./messages/messages.service.js');
const comments = require('./comments/comments.service.js');
const notifications = require('./notifications/notifications.service.js');
const questions = require('./questions/questions.service.js');
const answers = require('./answers/answers.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(messages);
  app.configure(comments);
  app.configure(notifications);
  app.configure(questions);
  app.configure(answers);
};

const users = require('./users/users.service.js');
const messages = require('./messages/messages.service.js');
const comments = require('./comments/comments.service.js');
const notifications = require('./notifications/notifications.service.js');
const questions = require('./questions/questions.service.js');
const answers = require('./answers/answers.service.js');
const cvs = require('./cvs/cvs.service.js');
const admins = require('./admins/admins.service.js');

// specialists
const specialists = require('./specialists/specialists.service.js');
const updateInfoSpec = require('./specialists/update-info/update.service');

// volunteers
const volunteers = require('./volunteers/volunteers.service.js');
const updateInfoVolun = require('./volunteers/update-info/update.service');

const members = require('./members/members.service.js');
const uploads = require('./uploads/uploads.service.js');
const emails = require('./emails/emails.service.js');
const authmanagement = require('./authmanagement/authmanagement.service.js');
const closeQuestion = require('./questions/close/close.service.js');
const likeQuestion = require('./questions/like/like.service.js');
const activeUser = require('./users/active/active.service');
const deactiveUser = require('./users/deactive/deactive.service');
const acceptSpec = require('./specialists/accept/accept.service');
const acceptVolun = require('./volunteers/accept/accept.service');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(messages);
  app.configure(comments);
  app.configure(notifications);
  app.configure(questions);
  app.configure(answers);
  app.configure(cvs);
  app.configure(admins);
  app.configure(specialists);
  app.configure(volunteers);
  app.configure(members);
  app.configure(uploads);
  app.configure(emails);
  app.configure(authmanagement);
  app.configure(closeQuestion);
  app.configure(likeQuestion);
  app.configure(activeUser);
  app.configure(deactiveUser);
  app.configure(acceptSpec);
  app.configure(acceptVolun);
  app.configure(updateInfoSpec);
  app.configure(updateInfoVolun);
};

// manage auth
const authmanagement = require('./authmanagement/authmanagement.service.js');
// users
const users = require('./users/users.service.js');
const activeUser = require('./users/active/active.service');
const deactiveUser = require('./users/deactive/deactive.service');

const messages = require('./messages/messages.service.js');
const comments = require('./comments/comments.service.js');
const notifications = require('./notifications/notifications.service.js');

const cvs = require('./cvs/cvs.service.js');
const admins = require('./admins/admins.service.js');
// specialists
const specialists = require('./specialists/specialists.service.js');
const updateInfoSpec = require('./specialists/update-info/update.service');
const acceptSpec = require('./specialists/accept/accept.service');
// volunteers
const volunteers = require('./volunteers/volunteers.service.js');
const updateInfoVolun = require('./volunteers/update-info/update.service');
const acceptVolun = require('./volunteers/accept/accept.service');
// members
const members = require('./members/members.service.js');
const updateInfoMember = require('./members/update-info/update.service');
// questions
const questions = require('./questions/questions.service.js');
const closeQuestion = require('./questions/close/close.service.js');
const likeQuestion = require('./questions/like/like.service.js');
// answers
const answers = require('./answers/answers.service.js');
const likeAnswer = require('./answers/like/like.service');
const dislikeAnswer = require('./answers/dislike/dislike.service');
const acceptAnswer = require('./answers/accept/accept.service');

const uploads = require('./uploads/uploads.service.js');
const emails = require('./emails/emails.service.js');

const mysevice = require('./mysevice/mysevice.service.js');


// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  // manage auth
  app.configure(authmanagement);
  // users
  app.configure(users);
  app.configure(activeUser);
  app.configure(deactiveUser);

  app.configure(messages);
  app.configure(comments);
  app.configure(notifications);

  app.configure(cvs);
  app.configure(admins);
  // specialists
  app.configure(specialists);
  app.configure(updateInfoSpec);
  app.configure(acceptSpec);
  // volunteers
  app.configure(volunteers);
  app.configure(updateInfoVolun);
  app.configure(acceptVolun);
  // members
  app.configure(members);
  app.configure(updateInfoMember);
  app.configure(uploads);
  app.configure(emails);
  // questions
  app.configure(questions);
  app.configure(closeQuestion);
  app.configure(likeQuestion);
  // answers
  app.configure(answers);
  app.configure(likeAnswer);
  app.configure(dislikeAnswer);
  app.configure(acceptAnswer);

  app.configure(mysevice);
};

// manage auth
const authmanagement = require('./authmanagement/authmanagement.service.js');
// users
const users = require('./users/users.service.js');
const activeUser = require('./users/active/active.service');
const deactiveUser = require('./users/deactive/deactive.service');
const turnOffNotify = require('./users/turn-off-notify/turn-off.service');
const turnOnNotify = require('./users/turn-on-notify/turn-on.service');

const messages = require('./messages/messages.service.js');

const notifications = require('./notifications/notifications.service.js');

const admins = require('./admins/admins.service.js');
// specialists
const specialists = require('./specialists/specialists.service.js');
const updateInfoSpec = require('./specialists/update-info/update.service');
const acceptSpec = require('./specialists/accept/accept.service');
// volunteers
const volunteers = require('./volunteers/volunteers.service.js');
const updateInfoVolun = require('./volunteers/update-info/update.service');
const acceptVolun = require('./volunteers/accept/accept.service');
const exchangePoint = require('./volunteers/exchange-point/exchange-point.service');
const exchangeGiftVolun = require('./volunteers/exchange-gift/exchange-gift.service');
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
// comments
const comments = require('./comments/comments.service.js');
// cvs
const cvs = require('./cvs/cvs.service.js');
const interestCv = require('./cvs/interest/interest.service');
const uploadCv = require('./cvs/upload-cv/upload-cv.service');

const uploads = require('./uploads/uploads.service.js');
const emails = require('./emails/emails.service.js');

const mysevice = require('./mysevice/mysevice.service.js');

// gifts
const gifts = require('./gifts/gifts.service.js');
const receive = require('./gifts/receive/receive.service');





const reviews = require('./reviews/reviews.service.js');





// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  // manage auth
  app.configure(authmanagement);
  // users
  app.configure(users);
  app.configure(activeUser);
  app.configure(deactiveUser);
  app.configure(turnOffNotify);
  app.configure(turnOnNotify);

  app.configure(messages);

  app.configure(notifications);

  app.configure(admins);
  // specialists
  app.configure(specialists);
  app.configure(updateInfoSpec);
  app.configure(acceptSpec);
  // volunteers
  app.configure(volunteers);
  app.configure(updateInfoVolun);
  app.configure(acceptVolun);
  app.configure(exchangePoint);
  app.configure(exchangeGiftVolun);
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
  // comments
  app.configure(comments);
  //cvs
  app.configure(cvs);
  app.configure(interestCv);
  app.configure(uploadCv);

  app.configure(mysevice);
  // gifts
  app.configure(gifts);
  app.configure(receive);

  app.configure(reviews);
};

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
const saveUploadCv = require('./cvs/upload-cv/upload-cv.service');
const uploadCv = require('./cvs/uploads/uploads.service');
const reviewCv = require('./cvs/review-cv/review-cv.service');
const cv = require('./cv/cv.service.js');
const publicCv = require('./cvs/public/public.service');


const emails = require('./emails/emails.service.js');

const mysevice = require('./mysevice/mysevice.service.js');

// gifts
const gifts = require('./gifts/gifts.service.js');
const updateGift = require('./gifts/update-info/update-info.service');
const receive = require('./gifts/receive/receive.service');
const uploadGift = require('./gifts/upload-gift/upload-gift.service.js');
// reviews
const reviews = require('./reviews/reviews.service.js');
const uploadReview = require('./reviews/upload-review/upload-review.service');
const review = require('./review/review.service.js');
const reportReview = require('./reviews/report/report.service');
const rateReview = require('./reviews/rate/rate.service');




const rooms = require('./rooms/rooms.service.js');




const recruitments = require('./recruitments/recruitments.service.js');




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
  app.configure(saveUploadCv);
  app.configure(uploadCv);
  app.configure(reviewCv);
  app.configure(cv);
  app.configure(publicCv);

  app.configure(mysevice);
  // gifts
  app.configure(gifts);
  app.configure(uploadGift);
  app.configure(receive);
  app.configure(updateGift);

  // reviews
  app.configure(reviews);
  app.configure(uploadReview);
  app.configure(review);
  app.configure(reportReview);
  app.configure(rateReview);
  app.configure(rooms);
  app.configure(recruitments);
};

/* eslint-disable no-unused-vars */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { Forbidden } = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, params, app, result } = context;

    // The logged in user
    const { user } = params;

    if (result.type === 'newCv') {
      const cv = await app.service('cvs').get(result.cvId);
      app.service('users').find({
        query: {
          fields: cv.field
        }
      }).then( ({data}) => {

        let email = null;
        for (let i = 0; i < data.length; i++) {
          let linkCv = 'http://localhost:8080/';
          if (data[i].role === 'specialist' && data[i].getEmailNotification) {
            linkCv += `specialistHome/view-cv/${cv._id}`.toString();
            email = {
              from: process.env.GMAIL,
              to: data[i].email,
              subject: 'New Cv in review-cv.com.vn',
              html:
              `
              <p>
                Có một CV mới được tải lên thuộc lĩnh vực ${cv.field} mà bạn quan tâm.
              </p>
              <p>
                Xem thông tin chi tiết tại: ${linkCv}
              </p>
              `
            };
            app.service('emails').create(email);
          } else if (data[i].role === 'volunteer' && data[i].getEmailNotification) {
            linkCv += `volunteerHome/view-cv/${cv._id}`.toString();
            email = {
              from: process.env.GMAIL,
              to: data[i].email,
              subject: 'New Cv in review-cv.com.vn',
              html:
              `
              <p>
                Có một CV mới được tải lên thuộc lĩnh vực ${cv.field} mà bạn quan tâm.
              </p>
              <p>
                Xem thông tin chi tiết tại: ${linkCv}
              </p>
              `
            };
            app.service('emails').create(email);
          } else {
            console.log('Not send mail newCv for member or admin');
          }

        }
      });

    } else if (result.type === 'newReview') {
      const toUser = await app.service('users').get(result.to);
      let linkReview = `http://localhost:8080/memberHome/review-result/${result.reviewId}`;
      let email = {
        from: process.env.GMAIL,
        to: toUser.email,
        subject: 'Kết quả review',
        html:
        `
        <p>
        Một CV của bạn vừa nhận được review
        </p>
        <p>
        Xem thông tin chi tiết tại: ${linkReview}
        </p>
        `
      };
      app.service('emails').create(email);
    }
    else if (result.type === 'exchangeGift') {
      const toUser = await app.service('users').get(result.to);
      const gift = await app.service('gifts').get(result.giftId);
      let serial = makeSerial(12);
      let email = {
        from: process.env.GMAIL,
        to: toUser.email,
        subject: 'Quà tặng',
        html:
        `
        <p>
        Bạn đã đổi thành công quà tặng <b>${gift.name}</b>
        </p>
        <p>
        Mã quà tặng là: <b>${serial}</b>
        </p>
        `
      };
      app.service('emails').create(email);
    } else {
      console.log('send mail');
    }

    return context;
  };
};


function makeSerial(length) {
  let result = '';
  //var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let characters = '0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

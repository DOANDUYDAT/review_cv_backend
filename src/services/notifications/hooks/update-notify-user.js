/* eslint-disable no-unused-vars */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { Forbidden } = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, params, app, result } = context;

    if (result.type === 'newCv') {
      const cv = await app.service('cvs').get(result.cvId);
      app.service('users').find({
        query: {
          fields: cv.field
        }
      }).then( ({data}) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].role === 'specialist' || data[i].role === 'volunteer') {
            let { listNotifications } = data[i];
            listNotifications.push(result._id);
            app.service('users').patch(data[i]._id, {
              listNotifications
            });
          }
        }
      });
    } else if (result.type === 'interestCv' || result.type === 'publicCv' || result.type === 'newReview') {
      app.service('users').get(result.to).then(user => {
        let { listNotifications } = user;
        listNotifications.push(result._id);
        app.service('users').patch(user._id, {
          listNotifications
        });
      });
    } else {
      console.log('update notify for user');
    }
    return context;
  };
};

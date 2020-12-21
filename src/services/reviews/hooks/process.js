/* eslint-disable no-unused-vars */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest, Forbidden, NotFound } = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, app, params } = context;
    // The logged in user
    const { user } = context.params;
    const { cvId } = data;

    if (!cvId) {
      throw new BadRequest('CvId is required');
    }
    const cv = await app.service('cvs').get(cvId);
    if (!cv) {
      throw new NotFound('Cv is not exists');
    }
    if (user.role === 'volunteer') {
      const mem = (await app.service('volunteers').find({
        query: {
          userId: user._id
        }
      })).data[0];
      if (!mem) {
        throw new NotFound('Member is not exist');
      }

      let link = null;
      if (params.file) {
        const { id } = await app.service('reviews/upload-review').create(data, params);
        link = id;
      }

      let type = link ? 'upload' : 'online';
      context.data = {
        // Set the user id
        cvId: cv._id,
        userId: user._id,
        link,
        type,
        createdAt: new Date().getTime(),
        updatedAt: null
      };
    } else if (user.role === 'specialist') {
      const mem = (await app.service('specialists').find({
        query: {
          userId: user._id
        }
      })).data[0];
      if (!mem) {
        throw new NotFound('Member is not exist');
      }

      let link = null;
      if (params.file) {
        const { id } = await app.service('reviews/upload-review').create(data, params);
        link = id;
      }

      let type = link ? 'upload' : 'online';
      context.data = {
        // Set the user id
        cvId: cv._id,
        userId: user._id,
        link,
        type,
        createdAt: new Date().getTime(),
        updatedAt: null
      };
    }
    else {
      throw new Forbidden('Not permission');
    }

    return context;
  };
};

/* eslint-disable no-unused-vars */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest, Forbidden, NotFound } = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, app, params } = context;
    // The logged in user
    const { user } = context.params;
    if (user.role !== 'member') {
      throw new Forbidden('Not permission');
    }
    const mem = (await app.service('members').find({
      query: {
        userId: user._id
      }
    })).data[0];
    if (!mem) {
      throw new NotFound('Member is not exist');
    }

    let link = null;
    if (params.file) {
      const { id } = await app.service('cvs/upload-cv').create(data, params);
      link = id;
    }

    let type = link ? 'upload' : 'online';
    context.data = {
      // Set the user id
      content: data.content,
      name: data.name,
      userId: user._id,
      link,
      listViewer: [user._id],
      listInterester: [],
      listReview: [],
      type,
      fields: data.fields,
      exp: data.exp,
      position: data.position,
      location: data.location,
      timeType: data.timeType,
      createdAt: new Date().getTime(),
      updatedAt: null
    };


    return context;
  };
};

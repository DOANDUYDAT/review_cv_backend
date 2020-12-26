/* eslint-disable no-unused-vars */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { BadRequest, Forbidden, NotFound } = require('@feathersjs/errors');
const commonHooks = require('feathers-hooks-common');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, params, app } = context;

    const gift = app.service('gifts').get(context.id);
    if (!gift) {
      throw new NotFound('Gift is not exist');
    }
    // logged user
    const { user } = params;
    if ((user && user.role === 'admin') || !params.provider) {
      let image = gift.image;
      if (params.file) {
        const { id } = await app.service('uploads').create(data, params);
        image = id;
      }

      // Update the original data (so that people can't submit additional stuff)
      const newData =
    {
      ...data,
      image,
      updatedAt: new Date().getTime()
    };
      context.data = Object.assign({}, context.data, newData);

    } else {
      throw new Forbidden('Not permission');
    }

    // The logged in user
    // const { user } = context.params;


    return context;
  };
};

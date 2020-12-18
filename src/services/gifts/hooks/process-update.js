/* eslint-disable no-unused-vars */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { BadRequest } = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, params, app } = context;

    if (!data.name) {
      throw new BadRequest('A name is required');
    }
    if (!data.value) {
      throw new BadRequest('A value is required');
    }
    if (!data.quantity) {
      throw new BadRequest('A quantity is required');
    }
    if (!data.category) {
      throw new BadRequest('A category is required');
    }

    // The logged in user
    // const { user } = context.params;
    let image = null;
    if (params.file) {
      const { id } = await app.service('uploads').create(data, params);
      image = id;
    }

    // Update the original data (so that people can't submit additional stuff)
    const newData =
    {
      ...data,
      image
    };
    context.data = Object.assign({}, context.data, newData);

    return context;
  };
};

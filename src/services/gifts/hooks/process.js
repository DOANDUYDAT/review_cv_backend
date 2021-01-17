/* eslint-disable no-unused-vars */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { Forbidden } = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, params, app } = context;

    // The logged in user
    const { user } = params;
    if (user.role !== 'admin') {
      throw new Forbidden('Not permission');
    }
    let image = null;
    if (params.file) {
      const { id } = await app.service('gifts/upload-gift').create(data, params);
      image = id;
    }

    context.data = {
      quantity: data.quantity,
      name: data.name,
      value: data.value,
      category: data.category,
      image,
      serial: data.serial,
      createdAt: new Date().getTime(),
      updatedAt: null
    };

    return context;
  };
};

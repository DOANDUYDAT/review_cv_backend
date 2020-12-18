/* eslint-disable no-unused-vars */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, params, app } = context;

    // The logged in user
    // const { user } = context.params;

    let image = null;
    if (params.file) {
      const { id } = await app.service('uploads').create(data, params);
      image = id;
    }
    // Update the original data (so that people can't submit additional stuff)
    context.data = {
      // Set the user id
      quantity: data.quantity,
      name: data.name,
      value: data.value,
      category: data.category,
      image,
      createdAt: new Date().getTime()
    };

    return context;
  };
};

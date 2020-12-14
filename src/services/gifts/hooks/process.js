// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data } = context;

    // The logged in user
    // const { user } = context.params;

    // Update the original data (so that people can't submit additional stuff)
    context.data = {
      // Set the user id
      quantity: data.quantity,
      name: data.name,
      value: data.value,
      category: data.category,
      createdAt: new Date().getTime()
    };

    return context;
  };
};

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { params } = context;
    console.log(params);
    const query = params.query;
    if (query.isAccept === 'false' || query.isAccept === 'FALSE') {
      query.isAccept = false;
    }
    if (query.isAccept === 'true' || query.isAccept === 'TRUE') {
      query.isAccept = true;
    }
    console.log(params);
    return context;
  };
};

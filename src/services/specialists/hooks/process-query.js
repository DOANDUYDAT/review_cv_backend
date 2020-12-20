/* eslint-disable no-unused-vars */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// const { BadRequest } = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { params } = context;
    const query = params.query;
    // if (query.isAccept && query.isAccept.toLowerCase() === 'false') {
    //   query.isAccept = false;
    // } else if (query.isAccept && query.isAccept.toLowerCase() === 'true') {
    //   query.isAccept = true;
    // }
    return context;
  };
};

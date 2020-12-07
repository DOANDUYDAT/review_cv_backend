const { BadRequest } = require('@feathersjs/errors');
const validator = require('validator');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, method } = context;
    const re = /^(0|\+84)[0-9]{9}$/;
    if (method === 'create') {
      if (!data.email) {
        throw new BadRequest('A email is required');
      } else if (!validator.isEmail(data.email)) {
        throw new BadRequest('Incorrect email format');
      }
      if (!data.userName) {
        throw new BadRequest('A userName is required');
      } else if (!validator.isAlphanumeric(data.userName)){
        throw new BadRequest('User name contains only letter and number');
      }
      if (!data.password) {
        throw new BadRequest('A password is required');
      }
    }
    else if (method === 'update' || method === 'patch') {
      const { user } = data;
      if (!user.userName) {
        throw new BadRequest('A username is required');
      } else if (!validator.isAlphanumeric(data.userName)){
        throw new BadRequest('Username contains only letter and number');
      }
      if (!user.phone) {
        throw new BadRequest('A phone is required');
      } else if (!re.test(data.phone)) {
        throw new BadRequest('Phone contains only 10 number and start with 0');
      }
    }

    return context;
  };
};

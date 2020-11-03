const { BadRequest } = require('@feathersjs/errors');
const validator = require('validator');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, method } = context;
    const roles = ['user', 'specialist', 'volunteer', 'admin'];
    const re = /^(0|\+84)[0-9]{9}$/;
    if (method === 'create') {
      if (!data.email) {
        throw new BadRequest('A email is required');
      } else if (!validator.isEmail(data.email)) {
        throw new BadRequest('Incorrect email format');
      }
      if (!data.username) {
        throw new BadRequest('A username is required');
      } else if (!validator.isAlphanumeric(data.username)){
        throw new BadRequest('Username contains only letter and number');
      }
      if (!data.password) {
        throw new BadRequest('A password is required');
      }
      if (!data.phone) {
        throw new BadRequest('A phone is required');
      } else if (!re.test(data.phone)) {
        throw new BadRequest('Phone contains only number and start with 0');
      }
      if (!data.role) {
        throw new BadRequest('A role is required');
      } else if (!roles.includes(data.role)) {
        throw new BadRequest('Role is invalid');
      }
    } else if (method === 'update' || method === 'patch') {
      if (!data.username) {
        throw new BadRequest('A username is required');
      } else if (!validator.isAlphanumeric(data.username)){
        throw new BadRequest('Username contains only letter and number');
      }
      if (!data.phone) {
        throw new BadRequest('A phone is required');
      } else if (!re.test(data.phone)) {
        throw new BadRequest('Phone contains only 10 number and start with 0');
      }
      if (data.birthday && validator.isDate(data.birthday, {
        format: 'dd/mm/yyyy',
        strictMode: false,
        delimiters: '/'
      })) {
        throw new BadRequest('Incorrect date format');
      }
    }

    return context;
  };
};

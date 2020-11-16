const { BadRequest } = require('@feathersjs/errors');
const validator = require('validator');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, method } = context;
    const regexPhone = /^(0|\+84)[0-9]{9}$/;
    const regexName = /^[A-Za-z]/;
    const regexUrl = /^[A-Za-z\-_.:?/\\]+$/;
    if (method === 'create') {
      if (!data.phone) {
        throw new BadRequest('A phone is required');
      } else if (!regexPhone.test(data.phone)) {
        throw new BadRequest('Phone contains only number and start with 0');
      }
      if (!data.websiteCompany) {
        throw new BadRequest('A website company is required');
      } else if (!regexName.test(data.websiteCompany)) {
        throw new BadRequest('Website company contains only number and start with 0');
      }
      if (!data.company) {
        throw new BadRequest('A company is required');
      } else if (!regexUrl.test(data.company)) {
        throw new BadRequest('Company contains only number and start with 0');
      }
    } else if (method === 'update' || method === 'patch') {
      if (!data.userName) {
        throw new BadRequest('A username is required');
      } else if (!validator.isAlphanumeric(data.username)){
        throw new BadRequest('Username contains only letter and number');
      }
      if (!data.phone) {
        throw new BadRequest('A phone is required');
      } else if (!regexPhone.test(data.phone)) {
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

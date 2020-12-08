/* eslint-disable no-unused-vars */
const { BadRequest } = require('@feathersjs/errors');
const { filter } = require('compression');
const validator = require('validator');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, method, params } = context;
    const regexPhone = /^(0|\+84)[0-9]{9}$/;

    const { _id, userName, phone, getEmailNotification } = data;
    if (!_id) {
      throw new BadRequest('A _id is required');
    }
    if (!userName) {
      throw new BadRequest('A username is required');
    } else if (!validator.isAlphanumeric(userName)){
      throw new BadRequest('Username contains only letter and number');
    }
    if (!phone) {
      throw new BadRequest('A phone is required');
    } else if (!regexPhone.test(phone)) {
      throw new BadRequest('Phone contains only 10 number and start with 0');
    }
    if (!getEmailNotification) {
      throw new BadRequest('A status of get notification by email is required');
    } else if (typeof getEmailNotification !== 'boolean') {
      throw new BadRequest('A status of get notification by email must be a Boolean');
    }

    return context;
  };
};

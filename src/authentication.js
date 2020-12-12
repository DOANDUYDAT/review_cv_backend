const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');
const { NotAuthenticated } = require('@feathersjs/errors');

class MyLocalStrategy extends LocalStrategy {
  async findEntity(username, paramas) {
    const entity = await super.findEntity(username, paramas);
    if (entity.isVerified === false) {
      throw new NotAuthenticated('User is not verified!');
    }
    if (entity.isActive === false) {
      throw NotAuthenticated('Account is locked, Please contact with Admin to be supported');
    }
    return entity;
  }
}

module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new MyLocalStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};

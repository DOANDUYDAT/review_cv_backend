const app = require('../../src/app');

describe('\'cvs\' service', () => {
  it('registered the service', () => {
    const service = app.service('cvs');
    expect(service).toBeTruthy();
  });
});

const app = require('../../src/app');

describe('\'mysevice\' service', () => {
  it('registered the service', () => {
    const service = app.service('mysevice');
    expect(service).toBeTruthy();
  });
});

const app = require('../../src/app');

describe('\'cv\' service', () => {
  it('registered the service', () => {
    const service = app.service('cv');
    expect(service).toBeTruthy();
  });
});

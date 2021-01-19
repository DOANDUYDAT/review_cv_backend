const app = require('../../src/app');

describe('\'recruitments\' service', () => {
  it('registered the service', () => {
    const service = app.service('recruitments');
    expect(service).toBeTruthy();
  });
});

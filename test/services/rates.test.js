const app = require('../../src/app');

describe('\'rates\' service', () => {
  it('registered the service', () => {
    const service = app.service('rates');
    expect(service).toBeTruthy();
  });
});

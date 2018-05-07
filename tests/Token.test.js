const TokenService = require('../lib/Token')

const tokenSample = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiSm9obiBEb2UiLCJleHAiOjE1MjU3MDAxNjE1NjJ9.qGB98H-4th9E0yTVHH235A4kCgFyKt5jIVgekk4fcp4';

test('Should fail to construct without a storageSystem', () => {
  const Token = new TokenService();
  expect(Token.storage).toBe(undefined);
});

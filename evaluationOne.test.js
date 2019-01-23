const { validateAllThrows } = require('./evalauationOne');

describe('validateAllThrows', () => {
  it('should return false if any value is < 0', () => {
    expect(validateAllThrows([0, -1, 10])).toEqual(false);
  });
  it('should return false if any value is > 10', () => {
    expect(validateAllThrows([0, 5, 11])).toEqual(false);
  });
  it('should return true if all values are in the range of 0 and 10 including', () => {
    expect(validateAllThrows([0, 5, 10, 7])).toEqual(true);
  });
});

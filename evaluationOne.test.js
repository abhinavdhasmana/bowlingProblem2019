const { validateAllThrows, convertInputIntoFrames } = require('./evalauationOne');

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

describe('convertInputIntoFrames', () => {
  it('should convert no strike, no spare input into 10 frames', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2];
    const allFrames = convertInputIntoFrames(input);
    expect(allFrames.length).toEqual(10);
  });

  it('should convert no strike, no spare input into frames in the same order', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2];
    const expectedOutput = [
      [1, 2], [3, 4], [5, 6], [7, 8], [9, 8], [7, 6], [5, 4], [3, 2], [1, 0], [1, 2],
    ];
    const allFrames = convertInputIntoFrames(input);
    expect(allFrames).toEqual(expectedOutput);
  });
});

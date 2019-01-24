const { validateAllThrows, convertInputIntoFrames, score } = require('./evalauationOne');

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

  it('should convert one spare input (not 10th frame) into frames in the same order', () => {
    const input = [1, 9, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2];
    const expectedOutput = [
      [1, 9], [3, 4], [5, 6], [7, 8], [9, 8], [7, 6], [5, 4], [3, 2], [1, 0], [1, 2],
    ];
    const allFrames = convertInputIntoFrames(input);
    expect(allFrames).toEqual(expectedOutput);
  });

  it('should convert multiple spare (not 10th frame)input into frames in the same order', () => {
    const input = [1, 9, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 7, 1, 0, 1, 2];
    const expectedOutput = [
      [1, 9], [3, 4], [5, 6], [7, 8], [9, 8], [7, 6], [5, 4], [3, 7], [1, 0], [1, 2],
    ];
    const allFrames = convertInputIntoFrames(input);
    expect(allFrames).toEqual(expectedOutput);
  });

  it('should convert multiple spare including 10th frame spare input into frames in the same order', () => {
    const input = [1, 9, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 7, 1, 0, 5, 5, 3];
    const expectedOutput = [
      [1, 9], [3, 4], [5, 6], [7, 8], [9, 8], [7, 6], [5, 4], [3, 7], [1, 0], [5, 5, 3],
    ];
    const allFrames = convertInputIntoFrames(input);
    expect(allFrames).toEqual(expectedOutput);
  });

  it('should convert single strike input into frames of length 10', () => {
    const input = [10, 7, 2, 4, 5, 6, 1, 8, 1, 8, 1, 6, 2, 4, 3, 7, 1, 0, 5];
    // const expectedOutput = [
    //   [1, 9], [3, 4], [5, 6], [7, 8], [9, 8], [7, 6], [5, 4], [3, 7], [1, 0], [5, 5, 3],
    // ];
    const allFrames = convertInputIntoFrames(input);
    expect(allFrames.length).toEqual(10);
  });

  it('should convert multiple strike input into frames of length 10', () => {
    const input = [10, 7, 1, 10, 5, 6, 1, 1, 10, 8, 1, 6, 2, 4, 3, 7, 1];
    // const expectedOutput = [
    //   [1, 9], [3, 4], [5, 6], [7, 8], [9, 8], [7, 6], [5, 4], [3, 7], [1, 0], [5, 5, 3],
    // ];
    const allFrames = convertInputIntoFrames(input);
    expect(allFrames.length).toEqual(10);
  });
});

describe('score', () => {
  describe('Check game can be scored correctly.', () => {
    it('should be able to score a game with all gutterballs', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      expect(score(rolls)).toEqual(0);
    });

    it('should be able to score a game with no strikes or spares', () => {
      const rolls = [3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6];
      expect(score(rolls)).toEqual(90);
    });

    it('a spare followed by zeros is worth ten points', () => {
      const rolls = [6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      expect(score(rolls)).toEqual(10);
    });

    it('points scored in the roll after a spare are counted twice', () => {
      const rolls = [6, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      expect(score(rolls)).toEqual(16);
    });

    it('consecutive spares each get a one-roll bonus', () => {
      const rolls = [5, 5, 3, 7, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      expect(score(rolls)).toEqual(31);
    });

    it('should allow fill ball the last frame is a spare', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3, 7];
      expect(score(rolls)).toEqual(17);
    });

    it('a strike earns ten  points in a frame with a single roll', () => {
      const rolls = [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      expect(score(rolls)).toEqual(10);
    });

    it('points scored in the two rolls after a strike are counted twice as a bonus', () => {
      const rolls = [10, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      expect(score(rolls)).toEqual(26);
    });

    it('should be able to score multiple strikes in a row', () => {
      const rolls = [10, 10, 10, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      expect(score(rolls)).toEqual(81);
    });

    it('should allow fill balls when the last frame is a strike', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 7, 1];
      expect(score(rolls)).toEqual(18);
    });

    it('rolling a spare with the two-roll bonus does not get a bonus roll', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 7, 3];
      expect(score(rolls)).toEqual(20);
    });

    it('strikes with the two-roll bonus do not get bonus rolls', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10];
      expect(score(rolls)).toEqual(30);
    });

    it('a strike with the one-roll bonus after a spare in the last frame does not get a bonus', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3, 10];
      expect(score(rolls)).toEqual(20);
    });

    it('should be able to score a perfect game', () => {
      const rolls = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
      expect(score(rolls)).toEqual(300);
    });
  });
});

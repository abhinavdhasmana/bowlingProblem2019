const validateAllThrows = allThrows => allThrows.every(val => ((val >= 0) && (val <= 10)));

const Frame = (throws, lastFrame = false) => {
  const values = throws;
  const sum = values.reduce((acc, val) => acc + val, 0);
  if ((sum > 10) && (!lastFrame)) {
    throw new Error('invalid frame. Value cannot be greater than 10');
  }
  let state;
  if (values.length === 1) {
    state = 'strike';
  } else if (lastFrame) {
    state = 'lastFrame';
  } else if (sum === 10) {
    state = 'spare';
  } else {
    state = 'open';
  }
  return {
    sum: () => sum,
    values: () => values,
    state: () => state,
  };
};

const convertInputIntoFrames = (allThrows) => {
  const allFrames = [];
  while (allThrows.length > 0) {
    if (allThrows.length === 3) {
      allFrames.push(Frame(allThrows.splice(0, 3), true));
    } else if (allThrows[0] === 10) {
      allFrames.push(Frame(allThrows.splice(0, 1)));
    } else {
      allFrames.push(Frame(allThrows.splice(0, 2)));
    }
  }
  return allFrames;
};

const findNextTwoValues = (index, allFrames) => {
  if (allFrames[index].state() === 'strike') {
    return allFrames[index].values()[0] + allFrames[index + 1].values()[0];
  }
  if (allFrames[index].state() === 'lastFrame') {
    return allFrames[index].values()[0] + allFrames[index].values()[1];
  }
  // if (allFrames[index].length === 2) {
  return allFrames[index].sum();
  // }
};

const calculateScoreFromFrames = (allFrames) => {
  let sum = 0;
  for (let i = 0; i < allFrames.length - 1; i += 1) {
    if (allFrames[i].state() === 'strike') {
      sum += findNextTwoValues(i + 1, allFrames) + 10;
    } else if (allFrames[i].state() === 'spare') {
      sum += (allFrames[i].sum()) + allFrames[i + 1].values()[0];
    } else {
      sum += (allFrames[i].sum());
    }
  }
  const tenthFrameTotal = allFrames[9].sum();
  return sum + tenthFrameTotal;
};

const score = (allThrows) => {
  if (validateAllThrows(allThrows)) {
    const frames = convertInputIntoFrames(allThrows);
    return calculateScoreFromFrames(frames);
  }
  return 'invalid input';
};


module.exports = { validateAllThrows, convertInputIntoFrames, score };

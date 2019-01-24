const validateAllThrows = allThrows => allThrows.every(val => ((val >= 0) && (val <= 10)));

const convertInputIntoFrames = (allThrows) => {
  const allFrames = [];
  while (allThrows.length > 0) {
    if (allThrows.length === 3) {
      allFrames.push(allThrows.splice(0, 3));
    } else if (allThrows[0] === 10) {
      allFrames.push(allThrows.splice(0, 1));
    } else {
      allFrames.push(allThrows.splice(0, 2));
    }
  }
  return allFrames;
};

const findNextTwoValues = (index, allFrames) => {
  if (allFrames[index].length === 1) {
    return allFrames[index][0] + allFrames[index + 1][0];
  }
  // if (allFrames[index].length === 2) {
  return allFrames[index][0] + allFrames[index][1];
  // }
};

const calculateScoreFromFrames = (allFrames) => {
  let sum = 0;
  for (let i = 0; i < allFrames.length - 1; i += 1) {
    if (allFrames[i].length === 1) {
      sum += findNextTwoValues(i + 1, allFrames) + 10;
    } else if ((allFrames[i][0] + allFrames[i][1]) === 10) {
      sum += (allFrames[i][0] + allFrames[i][1]) + allFrames[i + 1][0];
    } else {
      sum += (allFrames[i][0] + allFrames[i][1]);
    }
  }
  const tenthFrameTotal = allFrames[9].reduce((acc, val) => acc + val, 0);
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

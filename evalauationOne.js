const validateAllThrows = allThrows => allThrows.every(val => ((val >= 0) && (val <= 10)));

const convertInputIntoFrames = (allThrows) => {
  const allFrames = [];
  while (allThrows.length > 0) {
    if (allThrows.length === 3) {
      allFrames.push(allThrows.splice(0, 3));
    } else {
      allFrames.push(allThrows.splice(0, 2));
    }
  }
  return allFrames;
};


module.exports = { validateAllThrows, convertInputIntoFrames };

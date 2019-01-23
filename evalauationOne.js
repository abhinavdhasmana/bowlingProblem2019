const validateAllThrows = allThrows => allThrows.every(val => ((val >= 0) && (val <= 10)));


module.exports = { validateAllThrows };

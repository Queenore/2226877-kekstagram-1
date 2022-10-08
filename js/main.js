const rndNumber = (min, max) => {
  if (min < 0 || max < min) {
    return;
  }
  return Math.floor(Math.random( ) * (max - min + 1)) + min;
};

const checkMaxStrLen = (string, maxLength) => string.length < maxLength;


// examples
rndNumber(2, 15);
rndNumber(2, 2); // always 2
checkMaxStrLen('example', 13); // true
checkMaxStrLen('example', 3); // false


// source:
// https://calculator888.ru/spravochnik/sluchajnye-chisla/sluchajnoe-chislo-v-javascript.html

export const capitalize = inputText => {
  let text = inputText.split('');
  text[0] = text[0].toUpperCase();
  text = text.join('');
  return text;
};

export const generateRandomColor = () => {
  const randomColor =
    'rgb(' +
    Math.floor(Math.random() * 256) +
    ',' +
    Math.floor(Math.random() * 256) +
    ',' +
    Math.floor(Math.random() * 256) +
    ')';
  return randomColor;
};

export const increaseDouble = (targetNumber, increment) => {
  const result = [];
  for (let i = 0; i <= targetNumber; i += +`0.${increment}`) {
    result.push(+i.toFixed(1));
  }
  return result;
};

export const repeatRandomColors = times => {
  return 'a'
    .repeat(times)
    .split('')
    .map(color => generateRandomColor());
};

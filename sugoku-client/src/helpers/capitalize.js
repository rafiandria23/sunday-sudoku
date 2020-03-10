export default function capitalize (inputText) {
  let text = inputText.split('');
  text[0] = text[0].toUpperCase();
  text = text.join('');
  return text;
};

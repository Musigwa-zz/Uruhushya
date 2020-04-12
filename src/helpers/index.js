export const textShorthand = (text = '', limit = 25) => {
  if (text.length < limit) {
    return text;
  } else {
    return text.slice(0, limit).padEnd(3, '.');
  }
};

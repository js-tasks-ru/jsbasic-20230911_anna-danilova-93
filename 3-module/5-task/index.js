const getMinMax = (str) => {
  const numbers = str.split(" ").filter(Number);
  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  }

};

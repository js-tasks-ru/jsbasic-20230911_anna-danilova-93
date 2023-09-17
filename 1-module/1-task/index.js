const factorial = (n) => {
  if (!n || n < 2) return 1
  let result = n;
  for(let i = n - 1; i > 1;i--){
    result *= i;
  }
  return result;
}

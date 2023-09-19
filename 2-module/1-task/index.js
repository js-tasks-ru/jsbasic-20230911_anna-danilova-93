function getRealNumber(num){
  return Number.isFinite(num) ? num : 0;
}
function sumSalary(salaries) {
  let sumResult = 0;
  for (let key in salaries) {
    const value = salaries[key];
    if(typeof value === 'number'){
      sumResult += getRealNumber(value)
    }
  }
  return sumResult
}

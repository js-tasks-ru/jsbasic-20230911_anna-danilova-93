const showSalary = (users, ages) => {
  const filterUsers = users.filter(({age}) => age <= ages);
  return filterUsers.reduce((result, {name,balance}, index, arr) => {
    result += `${name}, ${balance}${index !== arr.length - 1 ? '\n' : ''}`
    return result
  }, '')
}

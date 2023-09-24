const namify = (users) => {
  return users.filter(({name})=> name).map(({name}) => name)
}

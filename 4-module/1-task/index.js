const makeFriendsList = (friends) => {
  const list = document.createElement('ul');

  friends.forEach(({firstName, lastName}) => {
    const li = document.createElement('li');
    li.innerHTML = `${firstName} ${lastName}`;
    list.append(li);
  });

  return list;
}

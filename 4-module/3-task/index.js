const upgradeStatus = (cell, attr, row) => {
  if (!cell) return;
  switch (attr) {
    case 'true':
      row.classList.add('available')
      break;
    case 'false':
      row.classList.add('unavailable')
      break;
    default:
      row.setAttribute('hidden', 'true');
  }
}

const addClassGender = (cell, row) => {
  if (cell) {
    if(cell.innerHTML === 'm') {
      row.classList.add('male')
    } else {
      row.classList.add('female')
    }
  }
}

const addStyle = (cell, row) => {
  if(cell && Number(cell.innerHTML) < 18) {
    row.style.textDecoration = 'line-through';
  }
}

const highlight = (table) => {
  for (let index = 1; index <= table.rows.length; index++) {
    const row = table.rows[index];
    const cells = row?.cells || [];

    const statusCell = cells[cells.length - 1];
    const genderCell = cells[2];
    const ageCell = cells[1];
    const availableAttrOfStatus = statusCell?.getAttribute('data-available')

    upgradeStatus(statusCell, availableAttrOfStatus, row);
    addClassGender(genderCell, row);
    addStyle(ageCell, row);
  }
}

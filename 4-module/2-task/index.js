const makeDiagonalRed = (table) => {
  for (let i = 0; i <= table.rows.length; i++) {
    const row = table.rows[i];
    if (row?.cells) {
      row.cells[i].style.backgroundColor = 'red';
    }
  }
}

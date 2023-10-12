/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
import createElement from '../../assets/lib/create-element.js';
export default class UserTable {
  elem = null;
  rows = [];
  btn = null;

  constructor(rows) {
    this.rows = rows;
    this.btn = `<td><button>X</button></td>`;
    this.render();
  }
  generateTable() {
    return `
      <table id="module-6-task-1">
        <tbody>
        ${this.rows.map((row, index) => `
        <tr id='row-${index}'>
            ${Object.values(row).map(value => `<td>${value}</td>`)}
            ${this.btn}
        </tr>`).join('')}
        </tbody>
      </table>
    `
  }

  render() {
    const temp = createElement(this.generateTable());

   const btnList = temp.querySelectorAll('button'); // 4 btn

    btnList.forEach((b, i) => b.addEventListener('click', () => this.delRow(i)))

    this.elem = temp;
  }

  delRow (position) {
    const row = document.querySelector(`#row-${position}`);
    row.remove();
  }
}




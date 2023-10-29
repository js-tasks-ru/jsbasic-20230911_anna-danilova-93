import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  elem = null;
  categories = [];
  activeId = null

  constructor(categories) {
    this.categories = categories;

    this.render();
    this.scrollMenu();
    this.setActiveMenu();
  }

  render() {
    this.elem = createElement(this.generateMenu());
  }

  generateMenu() {
    return `
       <div class="ribbon">
    <!--Кнопка прокрутки влево-->
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <!--Ссылки на категории-->
    <nav class="ribbon__inner">
    ${this.categories.map(({id, name}) => `<a href="#" class="ribbon__item" data-id="${id}">${name}</a>`)}
    </nav>

    <!--Кнопка прокрутки вправо-->
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
    `;
  }

  scrollMenu() {
    const inner = this.elem.querySelector('.ribbon__inner');
    const arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    const arrowLeft = this.elem.querySelector('.ribbon__arrow_left');

    const goTo = (side) => {
      const isLeft = side === 'left';
      if (isLeft) {
        inner.scrollBy(-350, 0);
      } else {
        inner.scrollBy(350, 0);
      }
    };

    const hiddenButtons = (ev) => {
      const {scrollLeft, scrollWidth, clientWidth} = ev.target;

      const scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft > 0) {
        arrowLeft.classList.add('ribbon__arrow_visible');
      } else {
        arrowLeft.classList.remove('ribbon__arrow_visible');
      }

      if (scrollRight === 0) {
        arrowRight.classList.remove('ribbon__arrow_visible');
      } else {
        arrowRight.classList.add('ribbon__arrow_visible');
      }
    };

    arrowLeft.addEventListener("click", () => goTo('left'));
    arrowRight.addEventListener("click", () => goTo('right'));
    inner.addEventListener("scroll", hiddenButtons);
  }

  getCategory() {
    return this.elem.querySelectorAll('[data-id]');
  }

  setActiveMenu() {
    const categories = this.getCategory();

    for (let i = 0; i <= categories.length; i++) {
      const menuItem = categories[i];
      const menuId = menuItem?.dataset.id;

      const event = new CustomEvent('ribbon-select', {
        detail: menuId,
        bubbles: true
      });
      menuItem?.addEventListener('click', () => {
        categories.forEach((cat) => {
          const id = cat?.dataset.id;
          if (id === menuId) {
            cat.classList.add('ribbon__item_active');
          } else {
            cat.classList.remove('ribbon__item_active');
          }
        });

        this.elem.dispatchEvent(event);
      });
    }
  }
}

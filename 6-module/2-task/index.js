import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  elem = null;
  name = '';
  price = 0;
  category= '';
  id = '';
  image = '';

  constructor({name,price,category,image,id}) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.image = image;
    this.id = id;

    this.render();
    this.getEventProductAdd();
  }

generateCard () {
    return `
    <div class="card">
    <div class="card__top">
        <img src="/assets/images/products/${this.image}" class="card__image" alt="product">
        <span class="card__price">€${this.price.toFixed(2)}</span>
    </div>
    <div class="card__body">
        <div class="card__title">${this.name}</div>
        <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
    </div>
</div>
    `
}

  render() {
    this.elem = createElement(this.generateCard());
  }

  getEventProductAdd () {
    const btnCard = this.elem.querySelector('.card__button');
    const event = new CustomEvent("product-add", {
      detail: this.id,
      bubbles: true
    })
    btnCard.addEventListener('click', () => this.elem.dispatchEvent(event));
  }
}

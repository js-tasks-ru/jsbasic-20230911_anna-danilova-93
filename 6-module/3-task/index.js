import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  elem= null;
  slides = [];
  offset = 0;
  constructor(slides) {
    this.slides = slides;

    this.render();
    this.move();
    this.getEventProductAddInSlide();
  }

  generateSlide({image, price, name, id}) {
    return `
      <div class="carousel__slide" data-id=${id}>
        <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${price}</span>
          <div class="carousel__title">${name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `
  }

  generateCarousel() {
    return `
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.slides.map(this.generateSlide)}
        </div>
      </div>
    `
  }
  render() {
    this.elem = createElement(this.generateCarousel());
  }

  getSlides() {
    return this.elem.querySelectorAll('[data-id]');
  }

  move() {
    const transBlock = this.elem.querySelector('.carousel__inner');
    const arrowRight = this.elem.querySelector('.carousel__arrow_right');
    const arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    const slides = this.getSlides();

    arrowLeft.style.display = 'none';

    const goTo = (side) => {
      const isLeft = side === 'left';

      if (isLeft) {
        this.offset--;
        arrowRight.style.display = '';

        if (this.offset >= 0) {
          transBlock.style.transform = `translateX(-${this.offset * transBlock.offsetWidth}px)`;
        }

        // убираем левую стрелку у первого слайда
        if (this.offset === 0) {
          arrowLeft.style.display = 'none';
        }
      } else {
        this.offset++;
        arrowLeft.style.display = '';

        if (this.offset < slides.length) {
          transBlock.style.transform = `translateX(-${this.offset * transBlock.offsetWidth}px)`;
        }

        // убираем правую стрелку у последнего слайда
        if (this.offset === slides.length - 1) {
          arrowRight.style.display = 'none';
        }
      }
    }

    arrowLeft.addEventListener("click", () => goTo('left'))
    arrowRight.addEventListener("click", () => goTo('right'))
  }

  getEventProductAddInSlide () {
    const slides = this.getSlides();

    for (let i = 0; i <= slides.length; i++) {
      const currentSlide = slides[i];
      const id = currentSlide?.dataset.id;
      const btnInSlide = currentSlide?.querySelector('.carousel__button');

      const event = new CustomEvent("product-add", {
        detail: id,
        bubbles: true
      });

      btnInSlide?.addEventListener('click', () => this.elem.dispatchEvent(event));
    }
  }
}

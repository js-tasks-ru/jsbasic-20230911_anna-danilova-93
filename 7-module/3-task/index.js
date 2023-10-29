import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  elem = null;
  steps = 0;
  value = 0;
  segments = 0;
  constructor({ steps = 0, value = 0 }) {
    this.steps = steps;
    this.value = value; //Number
    this.segments = steps - 1;

    this.render();
    this.changeSteps();
  }

  generateSlider() {
    return `
      <!--Корневой элемент слайдера-->
      <div class="slider">

        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb">
          <span class="slider__value">${this.value}</span>
        </div>

        <!--Полоска слайдера-->
        <div class="slider__progress"></div>

        <!-- Шаги слайдера (вертикальные чёрточки) -->
        <div class="slider__steps">
          <!-- текущий выбранный шаг выделен этим классом -->
          ${this.renderSpanNumber()}
        </div>
      </div>
    `;
  }

  renderSpanNumber() {
    return Array.from({ length: this.steps }).map(() => `<span></span>`).join('');
  }

  render() {
    this.elem = createElement(this.generateSlider());
  }

  changeSteps() {
    const sliderValue = this.elem.querySelector('.slider__value');
    const steps = this.elem.querySelector('.slider__steps').children;
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');

    steps[0].classList.add('slider__step-active');
    progress.style.width = 0;

    this.elem.addEventListener('click', (event) => {
      const sliderWidth = this.elem.offsetWidth; // 330px
      const sliderLeft = this.elem.getBoundingClientRect().left; // координата крайней левой точки слайдера 99
      const eventX = event.clientX; // 220

      const stepLengthPercent = 100 / this.segments; // процент одного сегмента
      const eventXPercent = (eventX - sliderLeft) / sliderWidth * 100; // процент клика от всей ширины слайдера

      this.value = Math.round(eventXPercent / stepLengthPercent); // 33 / 25 = 1 процент заполнения сегмента с округлением

      sliderValue.textContent = this.value;

      for (let i = 0; i < steps.length; i++) {
        if (this.value === i) {
          steps[i].classList.add('slider__step-active');
        } else {
          steps[i].classList.remove('slider__step-active');
        }
      }
      thumb.style.left = this.value * stepLengthPercent + '%';
      progress.style.width = this.value * stepLengthPercent + '%';

      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      }));
    });
  }
}

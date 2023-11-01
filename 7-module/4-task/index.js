import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  elem = null;
  steps = 0;
  value = 0;
  segments = 0;
  segmentsPercent = 0;
  percentThumb = 0;

  constructor({ steps = 0, value = 0 }) {
    this.steps = steps;
    this.value = value; //Number
    this.segments = steps - 1;
    this.segmentsPercent = Math.round(100 / this.segments);
    this.percentThumb = 0;

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

  onPointerDown = () => {
    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }

  onPointerMove = (event) => {
    const { sliderValue, thumb, progress, slider } = this.findElements();
    const sliderWidth = this.elem.offsetWidth; // 330px
    const sliderLeft = this.elem.getBoundingClientRect().left; // координата крайней левой точки слайдера 99
    const eventX = event.clientX; // 220

    const left = eventX - sliderLeft; // 121

    let leftRelative = left / sliderWidth; // 0 - 1

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    const leftPercents = leftRelative * 100;

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    const eventXPercent = (eventX - sliderLeft) / sliderWidth * 100; // процент клика от всей ширины слайдера

    const newValue = Math.round(eventXPercent / this.segmentsPercent);

    this.value = newValue < 0 || newValue > this.segments ? this.value : newValue; // 33 / 25 = 1 процент заполнения сегмента с округлением
    sliderValue.textContent = this.value;

    slider.classList.add('slider_dragging');
  }

  onPointerUp = () => {
    const { thumb, progress, slider } = this.findElements();
    slider.classList.remove('slider_dragging');
    document.removeEventListener('pointermove', this.onPointerMove);

    const offsetMove = this.segmentsPercent * this.value + '%';

    thumb.style.left = offsetMove;
    progress.style.width = offsetMove;

    this.setActiveStepStyle();

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  findElements() {
    const sliderValue = this.elem.querySelector('.slider__value');
    const steps = this.elem.querySelector('.slider__steps').children;
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const slider = document.querySelector('.slider');

    return {
      sliderValue,
      steps,
      thumb,
      progress,
      slider
    };
  }

  setActiveStepStyle() {
    const { steps } = this.findElements();

    for (let i = 0; i < steps.length; i++) {
      this.value === i ? steps[i].classList.add('slider__step-active') : steps[i].classList.remove('slider__step-active');
    }
  }

  changeSteps() {
    const { steps, sliderValue, thumb, progress } = this.findElements();
    steps[0].classList.add('slider__step-active');
    progress.style.width = 0;
    thumb.ondragstart = () => false;

    thumb.addEventListener('pointerdown', this.onPointerDown);

    this.elem.addEventListener('click', (event) => {
      const sliderWidth = this.elem.offsetWidth; // 330px
      const sliderLeft = this.elem.getBoundingClientRect().left; // координата крайней левой точки слайдера 99
      const eventX = event.clientX; // 220

      const eventXPercent = (eventX - sliderLeft) / sliderWidth * 100; // процент клика от всей ширины слайдера

      this.value = Math.round(eventXPercent / this.segmentsPercent); // 33 / 25 = 1 процент заполнения сегмента с округлением

      sliderValue.textContent = this.value;

      this.setActiveStepStyle();

      thumb.style.left = this.value * this.segmentsPercent + '%';
      progress.style.width = this.value * this.segmentsPercent + '%';

      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      }));
    });
  }
}


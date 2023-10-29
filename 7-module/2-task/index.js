import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  title = '';
  content = null;
  escListener = ({ code }) => {
    if (code === 'Escape') {
      this.close();
    }
  }
  constructor() {
  }

  generateModal() {
    return `
      <div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
        ${this.title}
        </h3>
      </div>

      <div class="modal__body">
</div>
    </div>

  </div>
</div>
    `;
  }

  render() {
    return createElement(this.generateModal());
  }

  open() {
    document.body.append(this.render());
    document.body.classList.add('is-modal-open');
    document.addEventListener('keydown', this.escListener);
    // this.bodyAppend();
    this.btnClose();
    this.setTitle(this.title);
    this.setBody(this.content);
  }

  close() {
    const modal = document.body.querySelector('.modal');

    if (modal) {
      modal.remove();
      document.body.classList.remove('is-modal-open');
      document.removeEventListener('keydown', this.escListener);
    }
  }

  btnClose() {
    const btn = document.querySelector('.modal__close');
    btn.addEventListener('click', this.close);
  }

  setTitle(titleValue) {
    if (titleValue !== this.title) {
      this.title = titleValue;
    }
    const title = document.querySelector('.modal__title');
    if (title) {
      title.innerHTML = this.title;
    }
  }

  setBody(bodyNode) {
    if (bodyNode !== this.content) {
      this.content = bodyNode;
    }
    const body = document.querySelector('.modal__body');
    if (body) {
      body.append(this.content);
    }
  }
}

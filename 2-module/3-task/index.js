const calculator = {
  num1: 0,
  num2: 0,
  read(a, b) {
    this.num1 = Number.isFinite(a) ? a : 0;
    this.num2 = Number.isFinite(b) ? b : 0;
  },
  sum() {
    return this.num1 + this.num2;
  },
  mul() {
    return this.num1 * this.num2;
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально

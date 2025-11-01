import { LottoNumberError } from '../error/index.js';
import { Validator } from '../util/index.js';
import { LOTTO } from '../const/index.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validateNumbers(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  #validateNumbers(numbers) {
    const validator = new Validator(numbers)
      .len(LOTTO.LENGTH)
      .onlyInt()
      .inRange(LOTTO.MIN, LOTTO.MAX)
      .unique();

    if (validator.failed()) throw new LottoNumberError();
  }

  getNumbers() {
    return [...this.#numbers];
  }
}

export default Lotto;

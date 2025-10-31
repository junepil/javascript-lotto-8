import { LottoNumberError } from '../error/index.js';
import { Validator } from '../util/index.js';
import { LOTTO } from '../const.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    const validator = new Validator(numbers)
      .len(LOTTO.LENGTH)
      .onlyInt()
      .inRange(LOTTO.MIN, LOTTO.MAX)
      .unique();

    if (validator.failed()) throw new LottoNumberError();

    this.#numbers = numbers.sort((a, b) => a - b);
  }

  getNumbers() {
    return [...this.#numbers];
  }
}

export default Lotto;

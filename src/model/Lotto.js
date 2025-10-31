import { LottoNumberError } from '../error/index.js';

class Lotto {
  #numbers;

  constructor(input) {
    this.#validate(input);
    this.#numbers = input.sort((a, b) => a - b);
  }

  #validateInputLength(input) {
    if (input.length !== 6) {
      throw new LottoNumberError('Lotto can only have input length 6.');
    }
  }

  #validateInteger(numbers) {
    for (const num of numbers) {
      if (!Number.isInteger(num))
        throw new LottoNumberError('Lotto should only contain integer.');
    }
  }

  #validateInRange(numbers) {
    for (const num of numbers) {
      if (num < 1 || num > 45)
        throw new LottoNumberError('Lotto number should be between 1 to 45.');
    }
  }

  #validateNoDuplication(numbers) {
    const numberSet = new Set(numbers);

    if (numberSet.size !== numbers.length) {
      throw new LottoNumberError('There should be no duplication in numbers.');
    }
  }

  #validate(input) {
    this.#validateInputLength(input);
    this.#validateInteger(input);
    this.#validateInRange(input);
    this.#validateNoDuplication(input);
  }

  getNumbers() {
    return [...this.#numbers];
  }
}

export default Lotto;

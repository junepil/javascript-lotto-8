import { LOTTO } from '../const/index.js';
import { LottoStatisticianError } from '../error/index.js';
import { Validator } from '../util/index.js';
import { Lotto } from './index.js';

class LottoStatistician {
  #winningNumbers;
  #bonusNumber;

  constructor(winnerNumbers, bonusNumber) {
    LottoStatistician.#validateNumbers([...winnerNumbers, bonusNumber]);

    this.#winningNumbers = winnerNumbers;
    this.#bonusNumber = [bonusNumber];
  }

  static #validateNumbers(numbers) {
    const validator = new Validator(numbers)
      .len(LOTTO.LENGTH + 1)
      .onlyInt()
      .inRange(LOTTO.MIN, LOTTO.MAX)
      .unique();

    if (validator.failed())
      throw new LottoStatisticianError('invalid input for constructor');
  }

  static #validateLottos(lottos) {
    const validator = new Validator(lottos).only(Lotto);

    if (validator.failed())
      throw new LottoStatisticianError(
        'input for get result should be all Lotto instances',
      );
  }

  static #matchNumbers(first, second) {
    let count = 0;

    for (const num1 of first) {
      for (const num2 of second) {
        if (num1 === num2) count++;
      }
    }

    return count;
  }

  #getPlace(lotto) {
    const numbers = lotto.getNumbers();

    const matchWithWinnerNumbers = LottoStatistician.#matchNumbers(
      numbers,
      this.#winningNumbers,
    );
    const matchWithBonnusNumbers = LottoStatistician.#matchNumbers(
      numbers,
      this.#bonusNumber,
    );

    if (matchWithWinnerNumbers === 6) return 1;
    if (matchWithWinnerNumbers === 5 && matchWithBonnusNumbers === 1) return 2;
    if (matchWithWinnerNumbers === 5) return 3;
    if (matchWithWinnerNumbers === 4) return 4;
    if (matchWithWinnerNumbers === 3) return 5;
  }

  #getResult(lottos) {
    const result = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    for (const lotto of lottos) {
      const place = this.#getPlace(lotto);

      if (place) result[place] += 1;
    }

    return result;
  }

  static #computeCost(lottos) {
    const numberOfLottos = lottos.length;

    return LOTTO.PRICE * numberOfLottos;
  }

  static #getProfitRate(result, cost) {
    let profit = 0;

    for (const place in result) {
      profit += result[place] * LOTTO.PRIZE[place];
    }

    return profit / cost;
  }

  getStatistic(lottos) {
    LottoStatistician.#validateLottos(lottos);
    const result = this.#getResult(lottos);
    const cost = LottoStatistician.#computeCost(lottos);
    const profitRate = LottoStatistician.#getProfitRate(result, cost);

    return { result, profitRate };
  }
}

export default LottoStatistician;

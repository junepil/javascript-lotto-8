import { Random } from '@woowacourse/mission-utils';
import { LOTTO } from '../const/lotto.js';
import { LottoVenderError } from '../error/index.js';
import { Validator } from '../util/index.js';
import Lotto from './Lotto.js';

class LottoVender {
  static getLottos(amount) {
    LottoVender.#validateAmount(amount);

    const lottos = [];
    const numberOfLottos = LottoVender.#getNumberOfLottos(amount);
    for (let i = 0; i < numberOfLottos; i++)
      lottos.push(LottoVender.#generateLotto());

    return lottos;
  }

  static #validateAmount(amount) {
    const validator = new Validator(amount).onlyInt().multipleOf(LOTTO.PRICE);

    if (validator.failed()) throw new LottoVenderError();
  }

  static #generateLotto() {
    const numbers = Random.pickUniqueNumbersInRange(
      LOTTO.MIN,
      LOTTO.MAX,
      LOTTO.LENGTH,
    );

    return new Lotto(numbers);
  }

  static #getNumberOfLottos(amount) {
    return parseInt(amount / LOTTO.PRICE);
  }
}

export default LottoVender;

import { LOTTO } from './const';

class CliLottoView {
  #input;
  #output;

  constructor(input, output) {
    this.#input = input;
    this.#output = output;
  }

  writeError(error) {
    this.#output(error.message);
  }

  async readAmount() {
    const amount = await this.#input('구입금액을 입력해 주세요.');

    return parseInt(amount);
  }

  writeLottos(lottos) {
    const number = lottos.length;

    this.#output(`${number}개를 구매했습니다.`);
    for (const lotto of lottos) {
      this.#output(lotto.getNumbers());
    }
  }

  async #readWinningNumbers() {
    const numbers = await this.#input('당첨 번호를 입력해 주세요.');

    return numbers.split(',').map((num) => parseInt(num));
  }

  async #readBonusNumber() {
    const number = await this.#input('보너스 번호를 입력해 주세요.');

    return parseInt(number);
  }

  async readNumbers() {
    const winningNumbers = await this.#readWinningNumbers();
    const bonusNumber = await this.#readBonusNumber();

    return [winningNumbers, bonusNumber];
  }

  writeStatistic(result, profitRate) {
    this.#output('당첨 통계\n');
    this.#output('---');

    const prompt = {
      1: '6개 일치',
      2: '5개 일치, 보너스 볼 일치',
      3: '5개 일치',
      4: '4개 일치',
      5: '3개 일치',
    };

    for (let i = 5; i > 0; i--) {
      this.#output(
        `${prompt[i]} (${LOTTO.PRIZE[i].toLocaleString('en-US')}원) - ${result[i]}개\n`,
      );
    }
    this.#output(`총 수익률은 ${profitRate}%입니다.`);
  }
}

export default CliLottoView;

import { Console } from '@woowacourse/mission-utils';
import CliLottoView from './CliLottoView.js';
import { LottoStatistician, LottoVender } from './model/index.js';
class App {
  #lottos;
  #lottoStatistician;
  #lottoView;

  constructor() {
    this.#lottoView = new CliLottoView(Console.readLineAsync, Console.print);
  }

  async buyLottos() {
    const amount = await this.#lottoView.readAmount();
    this.#lottos = LottoVender.getLottos(amount);
    this.#lottoView.writeLottos([...this.#lottos]);
  }

  async configStatistician() {
    const [winningNumbers, bonusNumber] = await this.#lottoView.readNumbers();
    this.#lottoStatistician = new LottoStatistician(
      winningNumbers,
      bonusNumber,
    );
  }

  generateReport() {
    const { result, profitRate } = this.#lottoStatistician.getStatistic([
      ...this.#lottos,
    ]);
    this.#lottoView.writeStatistic(result, profitRate);
  }

  async run() {
    try {
      await this.buyLottos();
      await this.configStatistician();
      this.generateReport();
    } catch (error) {
      this.#lottoView.writeError(error);
    }
  }
}

export default App;

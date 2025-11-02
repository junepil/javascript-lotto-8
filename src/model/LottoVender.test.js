import LottoVender from './LottoVender.js';
import Lotto from './Lotto.js';
import { LottoVenderError } from '../error/index.js';

jest.mock('./Lotto.js');

describe('Lotto Vender', () => {
  beforeEach(() => {
    Lotto.mockClear();
  });
  it('generates lottos according to the amount', () => {
    const lottos = LottoVender.getLottos(5000);

    expect(Lotto).toHaveBeenCalledTimes(5);
    expect(lottos).toBeInstanceOf(Array);
  });
  it.each([4500, 'ten-thousand', 3.14, {}])(
    'returns error if amount is %s, which is not multiple of lotto price',
    (amount) => {
      expect(() => {
        LottoVender.getLottos(amount);
      }).toThrow(LottoVenderError);
    },
  );
});

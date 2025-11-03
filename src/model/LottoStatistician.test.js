import { LottoStatisticianError } from '../error';
import { Lotto, LottoStatistician } from './index.js';

describe('Lotto Statistician', () => {
  it('can be created with valid numbers', () => {
    const lottoStatistician = new LottoStatistician([1, 2, 3, 4, 5, 6], 7);

    expect(lottoStatistician).toBeInstanceOf(LottoStatistician);
  });
  it.each([
    ['winning numbers length != 6', [(1, 2, 3, 4, 5)], 6],
    ['numbers contain n < 1', [(0, 1, 2, 3, 4, 5)], 6],
    ['numbers contain n > 45', [(1, 2, 3, 4, 5, 6)], 46],
    ['non-integer winning numbers  ', [('1', '2', '3', '4', '5', '6')], 7],
    ['duplicate winning numbers', [(1, 2, 3, 4, 5, 5)], 6],
    ['winning numbers and bonus number has duplicate', [(1, 2, 3, 4, 5, 6)], 6],
    ['not-integer bonus number', [(1, 2, 3, 4, 5, 6)], 'seven'],
  ])('throws error for %s', (_, winningNumbers, bonusNumber) => {
    expect(() => {
      new LottoStatistician(winningNumbers, bonusNumber);
    }).toThrow(LottoStatisticianError);
  });
  describe('getStatistic', () => {
    const lottoStatistician = new LottoStatistician([1, 2, 3, 4, 5, 6], 7);

    it('returns result statistic', () => {
      const lottos = [];

      const lottoNumbers = [
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 7],
        [1, 2, 3, 4, 5, 8],
        [1, 2, 3, 4, 8, 9],
        [1, 2, 3, 8, 9, 10],
      ];

      for (const number of lottoNumbers) {
        lottos.push(new Lotto(number));
      }

      const { result, profitRate } = lottoStatistician.getStatistic(lottos);
      expect(result).toEqual({
        1: 1,
        2: 1,
        3: 1,
        4: 1,
        5: 1,
      });
      expect(profitRate).toBe(406311);
    });
  });
});

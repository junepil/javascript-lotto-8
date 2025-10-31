import Lotto from './Lotto';
import { LottoNumberError } from '../error';

describe('Lotto', () => {
  it('saves numbers in ascending order', () => {
    const lotto = new Lotto([10, 20, 30, 5, 16, 27]);

    expect(lotto.getNumbers()).toEqual([5, 10, 16, 20, 27, 30]);
  });

  it('creates error if input length is more than 6.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow(LottoNumberError);
  });

  it('creates error if there is duplicated number.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow(LottoNumberError);
  });

  it('creates error if some number is not between 1 to 45.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 46]);
    }).toThrow(LottoNumberError);
  });

  it.each([[[1, 2, 3, 4, 5, 1.5]], [[1, 2, 3, 4, 5, 'one']]])(
    'creates error if some input is non-integer in %s.',
    (arg) => {
      expect(() => {
        new Lotto(arg);
      }).toThrow(LottoNumberError);
    },
  );
});

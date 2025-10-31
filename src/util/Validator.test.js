import Validator from './Validator.js';

describe('Validator', () => {
  describe('constructor', () => {
    it('creates new instance with array', () => {
      expect(new Validator([1, 2, 3])).toBeInstanceOf(Validator);
    });
    it('automaticaly changes single data into array', () => {
      expect(new Validator(5)).toBeInstanceOf(Validator);
    });
  });
  describe('checks length of the data', () => {
    it.each([
      [[1, 2, 3], 3],
      [1, 1],
    ])('validates the length with %s', (data, len) => {
      const validator = new Validator(data);
      expect(validator.len(len)).toBeInstanceOf(Validator);
    });
    it('returns false if the length of the data is not right', () => {
      const validator = new Validator([1, 2, 3, 4]);
      expect(validator.len(3).failed()).toBe(true);
    });
  });
  describe('validates if the data only contain integers', () => {
    it('validates the data only contain integers', () => {
      const validator = new Validator([1, 2, 3]);
      expect(validator.onlyInt()).toBeInstanceOf(Validator);
    });
    it.each([[[1, 2, 1.2]], [['1', '2', 'three']], ['!@#$'], ['마흔다섯']])(
      'returns false with %s containing non-integer value ',
      (data) => {
        const validator = new Validator(data);
        expect(validator.onlyInt().failed()).toBe(true);
      },
    );
  });
  describe('validates if the data is in certain range', () => {
    it('validates the range of the data', () => {
      const validator = new Validator([0, 2.5, 10]);
      expect(validator.inRange(0, 10)).toBeInstanceOf(Validator);
    });
    it.each([
      [2, 8],
      [0, 7],
      [9, 50],
    ])('returns false with range %s %s', (begin, end) => {
      const validator = new Validator([1, 5, 8]);
      expect(validator.inRange(begin, end).failed()).toBe(true);
    });
  });
});

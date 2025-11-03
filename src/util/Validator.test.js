import Validator from './Validator.js';
import { Lotto } from '../model';

describe('Validator', () => {
  describe('constructor', () => {
    it('creates new instance with array', () => {
      expect(new Validator([1, 2, 3])).toBeInstanceOf(Validator);
    });
    it('automaticaly changes single data into array', () => {
      expect(new Validator(5)).toBeInstanceOf(Validator);
    });
  });
  describe('len', () => {
    it.each([
      [[1, 2, 3], 3],
      [1, 1],
    ])('validates the length with %s', (data, len) => {
      const validator = new Validator(data);
      expect(validator.len(len).failed()).toBe(false);
    });
    it('returns false if the length of the data is not right', () => {
      const validator = new Validator([1, 2, 3, 4]);
      expect(validator.len(3).failed()).toBe(true);
    });
  });
  describe('onlyInt', () => {
    it('validates the data only contain integers', () => {
      const validator = new Validator([1, 2, 3]);
      expect(validator.onlyInt().failed()).toBe(false);
    });
    it.each([[[1, 2, 1.2]], [['1', '2', 'three']], ['!@#$'], ['마흔다섯']])(
      'returns false with %s containing non-integer value ',
      (data) => {
        const validator = new Validator(data);
        expect(validator.onlyInt().failed()).toBe(true);
      },
    );
  });
  describe('inRange', () => {
    it('validates the range of the data', () => {
      const validator = new Validator([0, 2.5, 10]);
      expect(validator.inRange(0, 10).failed()).toBe(false);
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
  describe('unique', () => {
    it('validate all data is unique', () => {
      const validator = new Validator([3, 6, 9]);
      expect(validator.unique().failed()).toBe(false);
    });
  });
  describe('multipleOf', () => {
    it('validate data is multiple of base', () => {
      const validator = new Validator([3, 6, 9]);
      expect(validator.multipleOf(3).failed()).toBe(false);
    });
    it('returns false if some number is not multiple of base', () => {
      const validator = new Validator([3, 6, 8]);
      expect(validator.multipleOf(2).failed()).toBe(true);
    });
  });
  describe('only', () => {
    it('validate data is only consist of specific class', () => {
      const validator = new Validator([new Lotto([1, 2, 3, 4, 5, 6])]);
      expect(validator.only(Lotto).failed()).toBe(false);
    });
    it('returns false if there is onrelated data', () => {
      const validator = new Validator([[], [], 5]);
      expect(validator.only(Array).failed()).toBe(true);
    });
  });
});

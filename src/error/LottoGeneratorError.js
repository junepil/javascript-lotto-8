import { CustomError } from './index.js';

class LottoGeneratorError extends CustomError {
  constructor(message = 'Invalid amount') {
    super(message);
  }
}

export default LottoGeneratorError;

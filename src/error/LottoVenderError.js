import { CustomError } from './index.js';

class LottoVenderError extends CustomError {
  constructor(message = 'Invalid amount') {
    super(message);
  }
}

export default LottoVenderError;

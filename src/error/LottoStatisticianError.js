import { CustomError } from './index.js';

class LottoVenderError extends CustomError {
  constructor(message = 'Invalid winner numbers') {
    super(message);
  }
}

export default LottoVenderError;

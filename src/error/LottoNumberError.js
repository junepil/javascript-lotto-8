import { CustomError } from './index.js';

class LottoNumberError extends CustomError {
  constructor(message = 'Invalid lotto number') {
    super(message);
  }
}

export default LottoNumberError;

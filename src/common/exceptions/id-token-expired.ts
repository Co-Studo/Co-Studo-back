import HttpException from '@common/exceptions/http';

class IdTokenExpired extends HttpException {
  constructor() {
    super(401, 'Get a fresh ID token');
  }
}

export default IdTokenExpired;

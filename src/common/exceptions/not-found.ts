import HttpException from '@common/exceptions/http-exception';

class NotFoundException extends HttpException {
  constructor(message = '찾을 수 없습니다.') {
    super(404, message);
  }
}

export default NotFoundException;

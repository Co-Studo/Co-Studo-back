import HttpException from '@common/exceptions/http';

class ForbiddenException extends HttpException {
  constructor(message = '접근 권한이 없습니다.') {
    super(403, message);
  }
}

export default ForbiddenException;

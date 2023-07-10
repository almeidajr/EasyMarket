import { Request } from 'express';

import { UserInRequest } from './user-in-request.type';

export interface AuthenticatedRequest extends Request {
  user: UserInRequest;
}

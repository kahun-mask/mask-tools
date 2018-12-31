import {
  NextFunction,
  Response,
  Request,
} from 'express';

interface AsyncMiddleware {
  (req: Request, res: Response): Promise<void>;
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

export const asyncHandler = (handler: AsyncMiddleware) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(
      handler(req, res, next),
    ).catch(next);
  };
};
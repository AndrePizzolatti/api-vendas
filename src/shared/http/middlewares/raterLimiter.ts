import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import cacheConfig from '@config/cache';
import AppError from '../../errors/AppError';

const redisClient = new Redis(cacheConfig.config.redis);

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (request.ip) {
      await limiter.consume(request.ip);
    } else {
      throw new AppError('IP address not found.', 400);
    }
    return next();
  } catch (err) {
    throw new AppError('Too many requests.', 429);
  }
}

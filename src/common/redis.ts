import redis from 'redis';

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw Error('Redis URL is not found');
}

const redisClient = redis.createClient({ url: redisUrl });

export default redisClient;

import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw Error('Redis URL is not found');
}

const redisClient = createClient({ url: redisUrl });

const redisInit = async () => {
  await redisClient.connect();
};

redisInit();

export default redisClient;

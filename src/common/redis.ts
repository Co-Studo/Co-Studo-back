import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw Error('Redis URL is not found');
}

const redisClient = createClient({ url: redisUrl });

redisClient.on('error', (err) => console.log('Redis Client Error', err));

const redisInit = async () => {
  await redisClient.connect();
};

redisInit();

export default redisClient;

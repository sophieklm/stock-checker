import redis from 'redis';
import bluebird from 'bluebird';
const client = redis.createClient();
bluebird.promisifyAll(redis.RedisClient.prototype);

client.on('connect', () => {
  // tslint:disable-next-line:no-console
  console.log('Redis client connected');
});

client.on('error', (err) => {
  // tslint:disable-next-line:no-console
  console.log('Something went wrong ' + err);
});

export default client;

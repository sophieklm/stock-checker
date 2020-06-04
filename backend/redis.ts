import redis from "redis";
import bluebird from "bluebird";
let REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const client = redis.createClient(REDIS_URL);
bluebird.promisifyAll(redis.RedisClient.prototype);

client.on("connect", () => {
  // tslint:disable-next-line:no-console
  console.log("Redis client connected");
});

client.on("error", (err) => {
  // tslint:disable-next-line:no-console
  console.log("Something went wrong " + err);
});

export default client;

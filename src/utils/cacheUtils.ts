import redis from "redis";

const redisClient = redis.createClient();
const DEFAULT_EXPIRATION = 3600;

function getOrSetCache(key, cb) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (error, data) => {
      if (error) return reject(error);
      if (data != null) return resolve(JSON.parse(data));

      const freshData = await cb();
      if (freshData !== null) {
        redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
        resolve(freshData);
      } else {
        resolve(null);
      }
    });
  });
}

export default getOrSetCache;

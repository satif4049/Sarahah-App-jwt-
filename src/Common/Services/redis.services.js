import { redisClient } from "../Clints/redis.clint.js";

export const set = ({key, value, options = {}}) => {
  return redisClient.set(key, value, options);
};

export const get = (key) => {
  return redisClient.get(key);
};

export const del = (key) => {
  return redisClient.del(key);
};

export const ttl = (key) => {
  return redisClient.ttl(key);
};

export const expire = (key , expireIn) => {
  return redisClient.expire(key , expireIn);
};
export const calcTTl=(expiration)=>{
  let currentTime = Math.floor(Date.now() / 1000);
  return expiration - currentTime
}
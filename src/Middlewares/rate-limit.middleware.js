import { ipKeyGenerator, rateLimit } from "express-rate-limit";
import { TooManyRequestsException } from "../Utils/Security/ErrorException/error.exception.js";
import {RedisStore} from "rate-limit-redis"
import axios from "axios";
import { redisClient } from "../Common/Clints/redis.clint.js";
function getIpDetails(ip) {
  return axios.get(`http://ip-api.com/json/${ip}`, {
    timeout: 3000,
  });
}


export const createRateLimiter = ()=>{
    return rateLimit({
       windowMs: 15 * 60 * 1000, // 15 minutes
       limit: async (req, res) => {
         try {
           const {
             data: { counteryCode },
           } = await getIpDetails(req.headers["x-forwareded-for"]);
           console.log({ counteryCode });
           let max;
           switch (counteryCode) {
             case "EG":
               max = 10;
               break;
             case "US":
               max = 4;
               break;

             default:
               max = 30;
               break;
           }
           return max;
         } catch (error) {
           console.error("IP lookup failed:", error.code || error.message);
         }
       },
       standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
       legacyHeaders: false, // Disable the `X-RateLimit-*` headers
       requestPropertyName: "rateLimtInfo",
       skipFailedRequests: true,
       handler: (req, res, next) => {
         next(TooManyRequestsException("Many Requests"));
       },
       keyGenerator: (req, res) => {
         const ip = ipKeyGenerator(req.headers["x-forwareded-for"]);
         return `${ip}_${req.url}`;
       },
       store: new RedisStore({
         sendCommand: async (...args) => {
           const data = await redisClient.sendCommand(args);
           return data;
         },
       }),
     });

}
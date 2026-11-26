import { createClient, RedisClientType } from "redis";
import { env } from "./env.js";

export const redisClient: RedisClientType = createClient({
  url: env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error ❌: ", err);
});

export const connectRedis = async (): Promise<void> => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Connected to Redis ✅");
  }
};

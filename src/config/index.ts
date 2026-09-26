import dotenv from "dotenv"

dotenv.config({
    quiet: true
})

const requiredEnv = (name: string) => {
  const value = process.env[name];

  if (!value) throw new Error(`The env ${name} is required`);

  return value;
};

export const config = {
  APP_ENV: requiredEnv("APP_ENV"),
  PORT: Number(requiredEnv("PORT")),

  DB_HOST: requiredEnv("DB_HOST"),
  DB_PORT: Number(requiredEnv("DB_PORT")),
  DB_NAME: requiredEnv("DB_NAME"),
  DB_USER: requiredEnv("DB_USER"),
  DB_PASSWORD: process.env["DB_PASSWORD"]
};

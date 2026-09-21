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
  PORT: Number(requiredEnv("PORT")),
};

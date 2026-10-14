import { DataSource } from "typeorm";
import { env } from "./env.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __direname = path.dirname(__filename);

console.log("__direname: ", path.join(__direname, "../database/entities/*.entity.{ts, js}"))

const AppDataSource: DataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASSWORD,

  logging: env.APP_ENV === "dev" ? ["query", "error"] : undefined,

  entities: [path.join(__direname, "../database/entities/*.entity.{ts, js}")],
  migrations: [path.join(__direname, "../database/migrations/*.{ts, js}")],
});

export default AppDataSource;

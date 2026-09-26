import AppDataSource from "./data-source.js";

export const connectDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log(`✅ Connected to the database`);
  } catch (error) {
    console.error(
      `❌ Something went wrong while trying to establish a connection: ${error}`,
    );
    process.exit(1);
  }
};

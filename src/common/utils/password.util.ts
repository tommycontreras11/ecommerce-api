import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, SALT_ROUNDS);

export const comparePassword = async (
  password: string,
  passwordEncrypted: string,
) => await bcrypt.compare(password, passwordEncrypted);

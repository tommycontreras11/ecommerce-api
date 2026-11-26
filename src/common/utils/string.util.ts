import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const hashData = async (password: string) =>
  await bcrypt.hash(password, SALT_ROUNDS);

export const compareData = async (
  password: string,
  passwordEncrypted: string,
) => await bcrypt.compare(password, passwordEncrypted);

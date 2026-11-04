import { generateAccessToken } from "../../common/utils/jwt.util.js";
import { comparePassword } from "../../common/utils/password.util.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js";
import { UnauthorizedException } from "../../exceptions/unauthorized.exception.js";
import { meFormatted } from "../../mappers/auth.mapper.js";
import { userRepository } from "../users/users.repository.js";
import { IMe } from "./auth.types.js";
import { SignIn } from "./auth.validation.js";

export const authService = {
  async signIn(payload: SignIn): Promise<{ token: string }> {
    const foundUserByEmail = await userRepository.findOneByEmail(payload.email);

    if (!foundUserByEmail)
      throw new UnauthorizedException("User y/o password incorrect");

    const comparePasswords = await comparePassword(
      payload.password,
      foundUserByEmail.password_hash,
    );

    if (!comparePasswords)
      throw new UnauthorizedException("User y/o password incorrect");

    return { token: generateAccessToken({ sub: foundUserByEmail.uuid }) };
  },
  async me(user_uuid: string): Promise<IMe> {
    const user = await userRepository.findOneByUuid(user_uuid);

    if (!user) throw new NotFoundException("User not found");

    return meFormatted(user);
  },
};

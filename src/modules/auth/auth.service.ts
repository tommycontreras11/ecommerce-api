import { generateAccessToken } from "../../common/utils/jwt.util.js";
import { comparePassword } from "../../common/utils/password.util.js";
import { UnauthorizedException } from "../../exceptions/unauthorized.exception.js";
import { userRepository } from "../users/users.repository.js";
import { SignIn } from "./auth.validation.js";

export const authService = {
  async signIn(payload: SignIn) {
    const foundUserByEmail = await userRepository.findOneByEmail(payload.email);

    if (!foundUserByEmail)
      throw new UnauthorizedException("User y/o password incorrect");

    const comparePasswords = await comparePassword(
      payload.password,
      foundUserByEmail.password_hash,
    );

    if (!comparePasswords)
      throw new UnauthorizedException("User y/o password incorrect");

    return generateAccessToken({ sub: foundUserByEmail.uuid });
  },
};

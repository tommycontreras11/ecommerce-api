import { NotFoundException } from "../../exceptions/not-found.exception.js";
import { sessionFormatted } from "../../mappers/session.mapper.js";
import { userRepository } from "../users/users.repository.js";
import { sessionRepository } from "./sessions.repository.js";
import { ICreateSession, ISession, IUpdateSession } from "./sessions.types.js";

export const sessionService = {
  async getOneByUuid(uuid: string): Promise<ISession> {
    const session = await sessionRepository.findOneByUuid(uuid);

    if (!session) throw new NotFoundException("Session not found");

    return sessionFormatted(session);
  },
  async create(payload: ICreateSession): Promise<ISession> {
    const user = await userRepository.findOneByUuid(payload.user.uuid);

    if (!user) throw new NotFoundException("User not found");

    return sessionFormatted(await sessionRepository.save({ ...payload, user }));
  },
  async modify(uuid: string, payload: IUpdateSession): Promise<ISession> {
    const session = await sessionRepository.findOneByUuid(uuid);

    if (!session) throw new NotFoundException("Session not found");

    return sessionFormatted(await sessionRepository.modify(session, payload));
  },
};

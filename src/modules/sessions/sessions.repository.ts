import AppDataSource from "../../config/database.js";
import { SessionEntity } from "../../database/entities/session.entity.js";
import { ICreateSession, IUpdateSession } from "./sessions.types.js";

const entity = AppDataSource.getRepository(SessionEntity);

export const sessionRepository = {
  findOneByUuid(uuid: string): Promise<SessionEntity | null> {
    return entity.findOne({
      relations: {
        user: true,
      },
      where: {
        uuid,
      },
    });
  },
  save(payload: ICreateSession): Promise<SessionEntity> {
    const session = entity.create({
      user: payload.user,
      ip_address: payload.ip_address,
      user_agent: payload.user_agent
    });

    return session.save();
  },
  modify(
    session: SessionEntity,
    payload: IUpdateSession,
  ): Promise<SessionEntity> {
    payload.revoked_at && (session.revoked_at = payload.revoked_at);

    return session.save();
  },
};

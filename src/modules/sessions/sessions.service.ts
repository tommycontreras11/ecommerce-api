import { EntityManager } from "typeorm";
import AppDataSource from "../../config/database.js";
import { SessionEntity } from "../../database/entities/session.entity.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js";
import { sessionFormatted } from "../../mappers/session.mapper.js";
import { sessionRepository } from "./sessions.repository.js";
import { ICreateSession, ISession } from "./sessions.types.js";

export const sessionService = {
  async getOneByUuid(uuid: string): Promise<ISession> {
    const session = await sessionRepository.findOneByUuid(uuid);

    if (!session) throw new NotFoundException("Session not found");

    return sessionFormatted(session);
  },
  async create(
    payload: ICreateSession,
    transactionalManager: EntityManager = AppDataSource.manager,
  ): Promise<SessionEntity> {
    return await sessionRepository.save(payload, transactionalManager);
  },
};

import { EntityManager } from "typeorm";
import AppDataSource from "../../config/database.js";
import { SessionEntity } from "../../database/entities/session.entity.js";
import { ICreateSession } from "./sessions.types.js";

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
  save(
    payload: ICreateSession,
    transactionalManager: EntityManager = AppDataSource.manager,
  ): Promise<SessionEntity> {
    return transactionalManager.save(SessionEntity, payload);
  },
};

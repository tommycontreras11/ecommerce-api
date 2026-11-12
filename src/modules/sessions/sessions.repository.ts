import AppDataSource from "../../config/database.js";
import { SessionEntity } from "../../database/entities/session.entity.js";

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
  }
};

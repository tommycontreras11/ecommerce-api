import { SessionEntity } from "../database/entities/session.entity.js";
import { ISession } from "../modules/sessions/sessions.types.js";

export const sessionFormatted = (session: SessionEntity): ISession => {
  return {
    uuid: session.uuid,
    user: {
      uuid: session.user.uuid,
      first_name: session.user.first_name,
      last_name: session.user.last_name,
      email: session.user.email,
    },
    ip_address: session.ip_address ?? null,
    user_agent: session.user_agent ?? null,
  };
};

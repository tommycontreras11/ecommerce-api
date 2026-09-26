import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base/base.entity.js";
import { UserRoleEntity } from "./user-role.entity.js";
import { SessionEntity } from "./session.entity.js";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @Column({ type: "varchar", length: 100 })
  first_name: string;

  @Column({ type: "varchar", length: 100 })
  last_name: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password_hash: string;

  @Column({ type: "bool", default: true })
  is_active: boolean;

  @Column({ type: "timestamptz", nullable: true })
  email_verified_at?: Date;

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.user)
  user_roles: UserRoleEntity[];

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity[];
}

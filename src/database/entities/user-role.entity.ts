import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { RoleEntity } from "./roles.entity.js";
import { UserEntity } from "./user.entity.js";

@Entity({ name: "user_roles" })
export class UserRoleEntity {
  @PrimaryColumn({ type: "int" })
  user_id: number;

  @PrimaryColumn({ type: "int" })
  role_id: number;

  @ManyToOne(() => UserEntity, (user) => user.user_roles, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.user_roles, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "role_id", referencedColumnName: "id" })
  role: RoleEntity;

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date;
}

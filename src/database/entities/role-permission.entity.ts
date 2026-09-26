import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { RoleEntity } from "./roles.entity.js";
import { PermissionEntity } from "./permission.entity.js";

@Entity({ name: "role_permissions" })
export class RolePermissionEntity {
  @PrimaryColumn({ type: "int" })
  role_id: number;

  @PrimaryColumn({ type: "int" })
  permission_id: number;

  @ManyToOne(() => RoleEntity, (role) => role.role_permissions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "role_id", referencedColumnName: "id" })
  role: RoleEntity;

  @ManyToOne(
    () => PermissionEntity,
    (permission) => permission.role_permissions,
    {
      onDelete: "CASCADE",
    },
  )
  @JoinColumn({ name: "permission_id", referencedColumnName: "id" })
  permission: PermissionEntity;

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date;
}

import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base/base.entity.js";
import { RolePermissionEntity } from "./role-permission.entity.js";

@Entity({ name: "permissions" })
export class PermissionEntity extends BaseEntity {
  @Column({ type: "varchar", unique: true })
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "varchar", length: 100 })
  resource: string;

  @Column({ type: "varchar", length: 100 })
  action: string;

  @OneToMany(
    () => RolePermissionEntity,
    (role_permission) => role_permission.permission,
  )
  role_permissions: RolePermissionEntity[];
}

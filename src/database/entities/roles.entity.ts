import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base/base.entity.js";
import { UserRoleEntity } from "./user-role.entity.js";
import { RolePermissionEntity } from "./role-permission.entity.js";

@Entity({ name: "roles" })
export class RoleEntity extends BaseEntity {
  @Column({ type: "varchar", length: 100, unique: true })
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "bool", default: true })
  is_active: boolean;

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.role)
  user_roles: UserRoleEntity[];

  @OneToMany(
    () => RolePermissionEntity,
    (role_permission) => role_permission.role,
  )
  role_permissions: RolePermissionEntity[];
}

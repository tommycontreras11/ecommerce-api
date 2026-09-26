import {
  BaseEntity as Base,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export class BaseEntity extends Base {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Generated("uuid")
  @Column({ type: "uuid" })
  uuid: string;

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamptz" })
  deleted_at?: Date;
}

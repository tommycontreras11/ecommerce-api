import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./user.entity.js";

@Entity({ name: "sessions" })
export class SessionEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Index({ unique: true })
  @Generated("uuid")
  @Column({ type: "uuid" })
  uuid: string;

  @Index()
  @Column({ type: "int" })
  user_id: number;

  @Column({ type: "varchar", length: 255, unique: true })
  token_hash: string;

  @Index()
  @Column({ type: "uuid" })
  token_family_uuid: string;

  @Column({ type: "inet", nullable: true })
  ip_address?: string;

  @Column({ type: "text", nullable: true })
  user_agent?: string;

  @Column({
    type: "timestamptz",
  })
  expires_at: Date;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  revoked_at?: Date;

  @CreateDateColumn({
    type: "timestamptz",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamptz",
  })
  updated_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.sessions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: UserEntity;
}

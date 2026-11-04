import {
  BaseEntity,
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
import { SessionEntity } from "./session.entity.js";

@Entity({ name: "refresh-tokens" })
export class RefreshTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Index({ unique: true })
  @Generated("uuid")
  @Column({ type: "uuid" })
  uuid: string;

  @Index()
  @Column({ type: "int" })
  session_id: number;

  @Column({ type: "varchar", length: 255, unique: true })
  token_hash: string;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  expires_at: Date;

  @CreateDateColumn({
    type: "timestamptz",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamptz",
  })
  updated_at: Date;

  @ManyToOne(() => SessionEntity, (session) => session.refreshTokens, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "session_id", referencedColumnName: "id" })
  session: SessionEntity;
}

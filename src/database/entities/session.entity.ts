import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./user.entity.js";
import { RefreshTokenEntity } from "./refresh-token.entity.js";

@Entity({ name: "sessions" })
export class SessionEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Index({ unique: true })
  @Generated("uuid")
  @Column({ type: "uuid" })
  uuid: string;

  @Index()
  @Column({ type: "int" })
  user_id: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  device_name?: string;

  @Column({ type: "varchar", length: 45, nullable: true })
  ip_address?: string;

  @Column({ type: "text", nullable: true })
  user_agent?: string;

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

  @OneToMany(() => RefreshTokenEntity, (refreshToken) => refreshToken.session)
  refreshTokens: RefreshTokenEntity[];
}

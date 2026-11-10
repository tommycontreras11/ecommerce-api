import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshTable1794317134153 implements MigrationInterface {
    name = 'AddRefreshTable1794317134153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_470985ca30b74dbc5784785de2"`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "session_id" integer NOT NULL, "token_hash" character varying(255) NOT NULL, "expires_at" TIMESTAMP WITH TIME ZONE, "revoked_at" TIMESTAMP WITH TIME ZONE, "replaced_by_token_id" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_f471d952607c096c28cfee0ca89" UNIQUE ("token_hash"), CONSTRAINT "PK_8c3ca3e3f1ad4fb45ec6b793aa0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_8c81f4f560417701d97147ece4" ON "refresh_tokens"  ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_1edff28531c60b556fcee77de0" ON "refresh_tokens"  ("session_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f88a90ece98174bf3b876b9566" ON "refresh_tokens"  ("replaced_by_token_id") `);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "UQ_abaa9e068cdd390bc5210f79884"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "token_hash"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "token_family_uuid"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "expires_at"`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "device_name" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "ip_address"`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "ip_address" character varying(45)`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_f88a90ece98174bf3b876b95662" FOREIGN KEY ("replaced_by_token_id") REFERENCES "refresh_tokens"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_1edff28531c60b556fcee77de0c" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_1edff28531c60b556fcee77de0c"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_f88a90ece98174bf3b876b95662"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "ip_address"`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "ip_address" inet`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "device_name"`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "token_family_uuid" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "token_hash" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "UQ_abaa9e068cdd390bc5210f79884" UNIQUE ("token_hash")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f88a90ece98174bf3b876b9566"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1edff28531c60b556fcee77de0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8c81f4f560417701d97147ece4"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`CREATE INDEX "IDX_470985ca30b74dbc5784785de2" ON "sessions" USING btree ("token_family_uuid") `);
    }

}

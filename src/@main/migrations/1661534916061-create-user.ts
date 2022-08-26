import { MigrationInterface, QueryRunner } from "typeorm";

export class createUser1661534916061 implements MigrationInterface {
    name = 'createUser1661534916061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "session" character varying, "password" character varying NOT NULL, "fullName" character varying NOT NULL, CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87" UNIQUE ("cpf"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

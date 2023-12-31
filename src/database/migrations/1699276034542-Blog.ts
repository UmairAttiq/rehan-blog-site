import { MigrationInterface, QueryRunner } from "typeorm"

export class Blog1699276034542 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`

        DROP TABLE IF EXISTS "blog";
        DROP SEQUENCE IF EXISTS blog_id_seq;
        CREATE SEQUENCE blog_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;
        
        CREATE TABLE "public"."blog" (
            "id" integer DEFAULT nextval('blog_id_seq') NOT NULL,
            "body" text NOT NULL,
            "title" character varying,
            "userId" integer,
            "statusId" integer,
            "createdAt" timestamp DEFAULT now() NOT NULL,
            "updatedAt" timestamp DEFAULT now() NOT NULL,
            "deletedAt" timestamp,
            CONSTRAINT "PK_blog_id" PRIMARY KEY ("id")
        ) WITH (oids = false);
        
        CREATE INDEX "IDX_blog_user" ON "public"."blog" USING btree ("userId");
        
        ALTER TABLE ONLY "public"."blog" ADD CONSTRAINT "FK_blog_user_id" FOREIGN KEY ("userId") REFERENCES "user"(id) NOT DEFERRABLE;
        ALTER TABLE ONLY "public"."blog" ADD CONSTRAINT "FK_blog_status_id" FOREIGN KEY ("statusId") REFERENCES "status"(id) NOT DEFERRABLE;
        
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

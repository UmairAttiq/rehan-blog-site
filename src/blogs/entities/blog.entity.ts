import { Expose } from "class-transformer";
import { Meta } from "src/metas/entities/meta.entity";
import { Status } from "src/statuses/entities/status.entity";
import { User } from "src/users/entities/user.entity";
import { PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";

export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: String, nullable: false, length: 10000 })
    body: string;

    @Column({ type: String, nullable: false })
    @Expose({ groups: ['me', 'admin'] })
    title: string;

    @OneToMany(type => Meta, meta => meta.blog, { eager: true })
    metas: Meta[]

    @ManyToOne(() => Status, {
        eager: true,
    })
    auther: User;

    @ManyToOne(() => Status, {
        eager: true,
    })
    status: Status;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}

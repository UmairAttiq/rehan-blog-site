import { Blog } from "src/blogs/entities/blog.entity";
import { Column, CreateDateColumn, DeleteDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class Meta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: String, nullable: false })
    name: string;

    @Column({ type: String, nullable: false })
    description: string;

    @ManyToOne(type => Blog, blog => blog.metas)
    blog: Blog;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}

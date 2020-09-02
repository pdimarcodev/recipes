import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, ManyToMany, JoinColumn} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { Category } from './Category';
import { User } from "./User";


@ObjectType()
@Entity()
export class Recipe extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({unique: true})
    name!: string;

    @Field()
    @Column()
    description?: string;

    @Field()
    @Column()
    ingredients!: string;


    @ManyToOne(type => Category, category => category.recipes)
    @JoinColumn()
    category!: Category;

    @ManyToMany(type => User, user => user.recipes)
    users!: User[];
}
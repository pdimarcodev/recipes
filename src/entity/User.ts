import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity, JoinTable} from "typeorm";
import { Field, ObjectType} from 'type-graphql';

import { Recipe } from "./Recipe";

@ObjectType()
@Entity()
export class User extends BaseEntity{

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column()
    name!: string;

    @Field(() => String)
    @Column({unique: true}) 
    email!: string;

    @Field(() => String)
    @Column()
    password!: string;

    @ManyToMany(type => Recipe, recipes => recipes.users)
    @JoinTable()
    recipes!: Recipe[];


}
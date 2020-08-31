import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { Recipe } from "./Recipe";

@ObjectType()
@Entity()
export class Category extends BaseEntity{

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({unique: true})
    name!: string;

    @OneToMany(type => Recipe, recipes => recipes.category)
    recipes!: Recipe[];


}
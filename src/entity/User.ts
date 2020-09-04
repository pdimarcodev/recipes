import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity, JoinTable, OneToMany} from "typeorm";
import { Field, ObjectType, Int} from 'type-graphql';

import { Recipe } from "./Recipe";
import { UserRecipe } from './UserRecipe';
 
@ObjectType()
@Entity()
export class User extends BaseEntity{

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => String)
    @Column({unique: true}) 
    email: string;

    @Field(() => String)
    @Column()
    password: string;

    @OneToMany(type => UserRecipe, userRecipe => userRecipe.recipe, {eager: true})
    @JoinTable()
    recipeConnection: Promise<Recipe[]>;


}
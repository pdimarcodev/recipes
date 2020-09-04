import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, ManyToMany, OneToMany, JoinColumn} from "typeorm";
import { ObjectType, Field, Int, Ctx } from "type-graphql";

import { Category } from './Category';
import { User } from "./User";
import { MyContext } from "../MyContext";
import {UserRecipe} from "./UserRecipe";


@ObjectType()
@Entity()
export class Recipe extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({unique: true})
    name: string;

    @Field({ nullable: true })
    @Column()
    description?: string;

    @Field()
    @Column()
    ingredients: string;


    @ManyToOne(type => Category, category => category.recipes, {cascade: true, eager: true})
    @JoinColumn()
    category: Category;

    @OneToMany(() => UserRecipe, UserRecipe => UserRecipe.recipe)
    userConnection: Promise<User[]>;

 
    
}
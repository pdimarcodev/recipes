import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Recipe } from "./Recipe";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    name!: string;

    @OneToMany(type => Recipe, recipes => recipes.category)
    recipes!: Recipe[];


}
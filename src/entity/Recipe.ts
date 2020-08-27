import {Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, ManyToMany, JoinTable, ManyToOne} from "typeorm";
import { User } from "./User";
import { Category } from "./Category";


@Entity()
export class Recipe {

    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    name: string;

    @PrimaryColumn()
    description: string;

    @Column()
    ingredients: string;

    @ManyToOne(type => Category, category => category.recipes)
    category: Category;

    @ManyToMany(type => User, user => user.recipes)
    @JoinTable()
    users: User[];
}

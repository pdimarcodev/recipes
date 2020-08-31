import { Resolver, Query, Mutation, Arg, InputType, Field } from "type-graphql";
import { Recipe } from "../entity/Recipe";


@InputType()
class RecipeInput {
    @Field()
    name!: string;

    @Field()
    description!: string;

    @Field()
    ingredients!: string;


}


@Resolver()
export class RecipeResolver {

    @Mutation(() => Recipe)
    async createRecipe(
        @Arg("data", () => RecipeInput) data: RecipeInput
    ) {
        try{
            const newRecipe = Recipe.create(data);
            return await newRecipe.save();
        } catch (err) {
            console.log(err);  
        }
        }
     


}
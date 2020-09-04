import { Resolver, Mutation, Arg, Int } from 'type-graphql';

import {UserRecipe} from '../entity/UserRecipe'; 

 
@Resolver()
export class UserRecipeResolver {

    @Mutation(() => Boolean)
    async createRecipeUser(
        @Arg("userId", () => Int) userId: number,
        @Arg("recipeId", () => Int) recipeId: number
    ) {     
        try {
            await UserRecipe.insert({userId, recipeId});
            return true;      
        } catch (err) {
            console.log(err);
        } 
    }

}


import { Resolver, Query, Mutation, Arg, Field, InputType, Int, ObjectType, Ctx, UseMiddleware } from 'type-graphql';
import { User } from '../entity/User';
import { MyContext } from '../MyContext';
import { isAuth } from '../isAuthMiddleware';

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


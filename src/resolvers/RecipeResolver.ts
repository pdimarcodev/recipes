import { Resolver, Query, Mutation, Arg, InputType, Field, FieldResolver, Root, UseMiddleware, Int, Ctx } from "type-graphql";

import { Recipe } from "../entity/Recipe";
import { isAuth } from "../isAuthMiddleware";
import { Category } from "../entity/Category";

@InputType()
class RecipeInput  {
    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    ingredients: string;

    @Field(() => Int)
    category: () => string;

}

@InputType()
class RecipeUpdateInput {
    @Field(() => String, {nullable: true})
    name?: string;

    @Field(() => String, {nullable: true})
    description?: string;

    @Field(() => String, {nullable: true})
    ingredients?: string;

    @Field(() => Int, {nullable: true})
    category?: () => string;
}

@InputType()
class RecipeQueryInput {
    @Field(() => String, {nullable: true})
    name?: string;

    @Field(() => String, {nullable: true})
    description?: string;

    @Field(() => String, {nullable: true})
    ingredients?: string;

    @Field(() => Int, {nullable: true})
    category?: () => string;
}


@Resolver(of => Recipe)
export class RecipeResolver {

    //OK
    @Mutation(() => Recipe)
    async createRecipe(
        @Arg("data", () => RecipeInput) data: RecipeInput
    ) {        
            await Recipe.insert(data);
            return data;       
    }

    // OK
    @Mutation(() => Boolean)
    async updateRecipe(
        @Arg("id", () => Int) id: number,
        @Arg("fields", () => RecipeUpdateInput) fields: RecipeUpdateInput
        ) {
            await Recipe.update({id}, fields);
            return true;
            
    }

    // OK ** se puede buscar por cualquier campo.
    // categoria se busca por id **
    @Query(() => [Recipe], {nullable: true})
    @UseMiddleware(isAuth)
    async getRecipes(
        @Arg("fields", () => RecipeQueryInput ) fields: RecipeQueryInput
        )
         {
            const qb = Recipe.createQueryBuilder('recipe')
          
            Object.entries(fields).map(([key, value]) => {     

            if (key === 'category' ) {
                qb.andWhere('recipe.category = :category', { category: fields.category})
                
            } else {
    
            qb.andWhere(key + ' like :' + key, {
                [`${key}`] : '%' + `${value}` + '%'});
            }});
        
        const result = await qb.getMany();
        return result;
    };

    @Query(() => Recipe, {nullable: true})
    async getOneRecipe(
        @Arg("name", () => String) name: string
    ) {
        return await Recipe.findOne({name});
    }


    @FieldResolver(() => Category)
    async category(@Root() recipe: Recipe) {
    return await Category.findOne(recipe.category);
    }
         
}
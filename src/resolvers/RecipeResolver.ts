import { Resolver, Query, Mutation, Arg, InputType, Field, FieldResolver, Root, UseMiddleware, Int } from "type-graphql";
import { Recipe } from "../entity/Recipe";
import { isAuth } from "../isAuthMiddleware";


@InputType()
class RecipeInput  {
    @Field()
    name!: string;

    @Field()
    description!: string;

    @Field()
    ingredients!: string;

    @Field(() => Int)
    category!: () => string;

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


@Resolver()
export class RecipeResolver {

    @Mutation(() => Recipe)
    async createRecipe(
        @Arg("data", () => RecipeInput) data: RecipeInput
    ) {
          
            await Recipe.insert(data);
            return data;
        
    }

    @Mutation(() => Boolean)
    async updateRecipe(
        @Arg("id", () => Int) id: number,
        @Arg("fields", () => RecipeUpdateInput) fields: RecipeUpdateInput
        ) {
            await Recipe.update({id}, fields);
            return true;
            
    }

    @Query(() => [Recipe])
    @UseMiddleware(isAuth)
    async getRecipes() {
        return await Recipe.find();
    }


    @Query(() => Recipe)
    @UseMiddleware(isAuth)
    async getRecipe(
        @Arg("name", () => String) name: string
        )
         {
        return await Recipe.findOne({where: {name}});
    }

     
    // @FieldResolver()
    // async categoryId(@Root() recipe: Recipe) {
    // const category = await this.catRepository.findOne({where: {id: this.categoryId}});
    // if (!category) throw new Error('Category not found.');
    // return category;
//   }

}
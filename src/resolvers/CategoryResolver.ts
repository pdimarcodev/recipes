import { Resolver, Query, Mutation, Arg, InputType, Field, UseMiddleware, Int } from "type-graphql";
import { Category } from "../entity/Category";
import { isAuth } from "../isAuthMiddleware";


@InputType()
class CategoryInput {
    @Field()
    name!: string;

}

@Resolver()
export class CategoryResolver {

    @Mutation(() => Boolean)
    async createCategory(
        @Arg("data", () => CategoryInput) data: CategoryInput
    ) {
        
            
           await Category.insert(data);
            return true;
    }

    @Mutation(() => Boolean)
    async updateCategory(
        @Arg("id", () => Int) id: number,
        @Arg("fields", () => CategoryInput) fields: CategoryInput
        ) {
            await Category.update({id}, fields);
            return true;
    }

    @Query(() => [Category])
    @UseMiddleware(isAuth)
    async getCategories() {
        return await Category.find();
    }
     
    @Query(() => Category)
    @UseMiddleware(isAuth)
    async getCategory(
        @Arg("name", () => String) name: string
        )
         {
        return await Category.findOne({where: {name}});
    }

}


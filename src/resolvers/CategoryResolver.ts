import { Resolver, Query, Mutation, Arg, InputType, Field } from "type-graphql";
import { Category } from "../entity/Category";


@InputType()
class CategoryInput {
    @Field()
    name!: string;

}


@Resolver()
export class CategoryResolver {

    @Mutation(() => Category)
    async createCategory(
        @Arg("data", () => CategoryInput) data: CategoryInput
    ) {
        try{
            const newCategory = Category.create(data);
            return await newCategory.save();
        } catch (err) {
            console.log(err);  
        }
        }
     


}
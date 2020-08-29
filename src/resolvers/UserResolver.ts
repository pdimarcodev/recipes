
import { Resolver, Query, Mutation, Arg, Field, InputType, Int } from 'type-graphql';

import { User } from '../entity/User';


@InputType()
class UserInput {
    @Field()
    name!: string;

    @Field()
    email!: string;

    @Field()
    password!: string;
}

@InputType()
class UserUpdateInput {
    @Field(() => String, {nullable: true})
    name?: string;

    @Field(() => String, {nullable: true})
    email?: string;

    @Field(() => String, {nullable: true})
    password?: string;
}
 
@Resolver()
export class UserResolver {

    @Mutation(() => User)
    async signUp(
        @Arg("variables", () => UserInput) variables: UserInput 
    ) { 
    const newUser = User.create(variables);
    return await newUser.save();
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg("id", () => Int) id: number) {
        await User.delete(id);
        return true;
    }

    @Mutation(() => Boolean)
    async updateUser(
        @Arg("id", () => Int) id: number,
        @Arg("fields", () => UserUpdateInput) fields: UserUpdateInput
        ) {
            await User.update({id}, fields);
            return true;
    }

    @Query(() => [User])
    getUsers() {
        return User.find()
    }
} 
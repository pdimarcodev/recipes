import { Resolver, Query, Mutation, Arg, Field, InputType, Int, ObjectType, Ctx, UseMiddleware } from 'type-graphql';
import { hash, compare } from 'bcryptjs';

import { User } from '../entity/User';
import { MyContext } from '../MyContext';
import { createRefreshToken, createAccessToken } from '../auth';
import { isAuth } from '../isAuthMiddleware';
import { sendRefreshToken } from '../sendRefreshToken';
import { IsEmail } from 'class-validator';


@ObjectType()
class LoginResponse {
    @Field()
    accessToken!: string;
}

@InputType()
class UserInput {
    @Field()
    name!: string;

    @IsEmail()
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
        @Arg("data", () => UserInput) data: UserInput 
    ) {
    
    try{
        const user = await User.findOne({ where: {email: data.email} });
        if (user) {
                throw new Error('User already exists.');
        }
    
        const hashedPassword = await hash(data.password, 12)
        const newUser = User.create({...data, password: hashedPassword});
        return await newUser.save();
    } catch (err) {
        console.log(err);  
    }
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() {res}: MyContext
    ): Promise<LoginResponse> { 
    
    const user = await User.findOne({ where: {email} });

    if (!user) {
        throw new Error('User not found.');
    }

    const valid = await compare(password, user.password);

    if (!valid) {
        throw new Error('Bad password.');
    }

    // login successful
    sendRefreshToken(res, createRefreshToken(user));

    return {
        accessToken: createAccessToken(user)
    };

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
    async getUsers() {
        return await User.find();
    }

    @Query(() => String)
    @UseMiddleware(isAuth)
    getMyUserId(@Ctx() {payload}: MyContext) {
        return `your user id is: ${payload!.userId}`;
    }
} 
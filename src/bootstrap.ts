import { getRepository } from "typeorm";
import { User } from "./entity/User";
import { Category } from "./entity/Category";
import { Recipe } from "./entity/Recipe";

export const Bootstrap = async () => {

  // Crear categoria
    const catRepo = getRepository(Category);
    const category = catRepo.create({
      name: "verduras"
    });

    await catRepo.save(category).catch((err) => {
      console.log("Error: ", err);
    });
    console.log("New Category Saved", category);

  // Crear receta
    const recRepo = getRepository(Recipe);
    const recipe = recRepo.create({
      name: "panache",
      description: "hortalizas variadas",
      ingredients: "patata",
      category: category
    });

    await recRepo.save(recipe).catch((err) => {
      console.log("Error: ", err);
    });
    console.log("New Recipe Saved", category);


    // Crear usuario   
    const userRepo = getRepository(User);
    const user = userRepo.create({
      name: "Alex",
      email: "alex@example.com",
      password: "123",
      recipes: [recipe]
    });
    await userRepo.save(user).catch((err) => {
      console.log("Error: ", err);
    });
    console.log("New User Saved", user);
  

  };
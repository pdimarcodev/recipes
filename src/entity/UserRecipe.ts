import { Entity, PrimaryColumn, ManyToOne, JoinColumn, BaseEntity} from 'typeorm';
import { User } from './User';
import { Recipe } from './Recipe';
  
  @Entity()
  export class UserRecipe extends BaseEntity {
  
    @PrimaryColumn({name: 'user_id'})
    userId: number;
  
    @PrimaryColumn({name: 'recipe_id'})
    recipeId: number;
  
    @ManyToOne(() => User, user => user.recipeConnection, {primary: true})
    @JoinColumn({name: 'user_id'})
    user: User[];
  
    @ManyToOne(() => Recipe,  recipe => recipe.userConnection, {primary: true})
    @JoinColumn({name: 'recipe_id'})
    recipe: Recipe[];
  }
  
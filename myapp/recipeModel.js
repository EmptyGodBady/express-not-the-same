const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Определение подсхемы для блюд
const mealSchema = new Schema({
      name: String,
      ingredients: [String], 
});



// Основная схема для рецептов
const recipeSchema = new Schema({
  mainingredients: [String],
  optionalingredients: [String],
  meals: [mealSchema],
  bakery: [mealSchema],
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

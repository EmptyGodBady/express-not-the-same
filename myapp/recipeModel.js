const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Определение подсхемы для блюд
const mealSchema = new Schema({
  name: String,
  ingredients: [String],
}, { _id: false });

// Определение подсхемы для выпечки
const bakerySchema = new Schema({
  name: String,
  ingredients: [String],
}, { _id: false });

// Основная схема для рецептов
const recipeSchema = new Schema({
  mainIngredients: {
    type: [String],
    required: true
  },
  optionalIngredients: [String],
  meals: [mealSchema],
  bakery: [bakerySchema],
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

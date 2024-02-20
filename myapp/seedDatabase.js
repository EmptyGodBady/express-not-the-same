const mongoose = require('mongoose');
const Recipe = require('./recipeModel.js'); // Убедитесь, что путь к файлу модели указан верно

mongoose.connect('mongodb://localhost:27017/recepiesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Замените данный массив на ваш массив рецептов, исправив неприемлемые значения
const recipes = [

    {
      mainIngridients: ["rise", "grecha", "bulgur", "makarons", "potato"],
      optionalIngridients: ["chiken", "beef", "pork"],
    },
    {
      meals: [
        {
          name: "stewed potatoes",
          ingridients: ["potato", "pork", "carrot", "onions", "garlic"],
        },
        {
          name: "plov",
          ingridients: ["rise", "chiken", "carrot", "onions", "garlic"],
        },
        {
          name: "supe",
          ingridients: [
            "1 tablespoon vegetable oil",
            "1 onion, chopped",
            "2 cloves of garlic, minced",
            "1 carrot, diced",
            "1 celery stalk, diced",
            "1 liter of chicken or vegetable broth",
            "1 cup of pasta (e.g., macaroni, fusilli, or shells)",
            "1 can of diced tomatoes (400g)",
            "1 teaspoon dried oregano",
            "1 teaspoon dried basil",
            "Salt and pepper to taste",
            "Grated Parmesan cheese, for serving",
            "Fresh parsley, chopped, for garnish",
          ],
        },
        {
          name: "makarons po flotski",
          ingridients: [
            "makarons",
            "ground beef",
            "tomato paste",
            "onions",
            "garlic",
          ],
        },
      ],
    },
    {
      bakery: [
        {
          name: "pancakes",
          ingridients: [
            "1 cup all-purpose flour",
            "2 tablespoons sugar",
            "1 teaspoon baking powder",
            "1/2 teaspoon baking soda",
            "1/2 teaspoon salt",
            "3/4 cup milk",
            "1 large egg",
            "2 tablespoons unsalted butter, melted",
            "1 teaspoon vanilla extract",
          ],
        },
        {
          name: "prikoly",
          ingridients: [
            "1 and 1/2 cups of kefir",
            "2 eggs",
            "2 tablespoons sugar",
            "1/4 teaspoon salt",
            "1/2 teaspoon baking soda",
            "2 cups flour",
            "3 tablespoons vegetable oil",
          ],
        },
        {
          name: "draniki",
          ingridients: [
            "5 medium potatoes",
            "1 onion",
            "1 egg",
            "2 tablespoons flour",
            "Salt to taste",
            "Pepper to taste",
            "Vegetable oil for frying",
          ],
        },
        {
          name: "zapekanka",
          ingridients: [
            "500g cottage cheese",
            "3 eggs",
            "100g sugar",
            "1 packet of vanilla sugar (or 1 teaspoon vanilla extract)",
            "2 tablespoons semolina",
            "50g raisins (optional)",
            "Butter for greasing the form",
            "Sour cream, for serving (optional)",
            "Fresh berries or fruit, for serving (optional)",
          ],
        },
        {
          name: "charlotka",
          ingridients: [
            "4-5 medium apples, peeled and sliced",
            "1 cup (200g) sugar",
            "1 cup (125g) all-purpose flour",
            "3 large eggs",
            "1 teaspoon baking powder",
            "1 teaspoon vanilla extract",
            "Powdered sugar for dusting",
            "Butter for greasing the pan",
          ],
        },
      ],
    },
  ];
  

const seedDatabase = async () => {
  await Recipe.deleteMany({}); // Очистка предыдущих данных, будьте осторожны с этим в продакшене!

  for (let recipe of recipes) {
    if (recipe.meals) {
      for (let meal of recipe.meals) {
        const newRecipe = new Recipe({
          mainIngredients: recipe.mainIngridients, // Убедитесь, что ключи совпадают с вашей моделью
          optionalIngredients: recipe.optionalIngridients,
          meals: [meal], // Оберните meal в массив, если ваша модель предполагает массив объектов
          bakery: []
        });
        await newRecipe.save();
      }
    }
    if (recipe.bakery) {
      for (let item of recipe.bakery) {
        const newRecipe = new Recipe({
          mainIngredients: recipe.mainIngridients,
          optionalIngredients: recipe.optionalIngridients,
          meals: [],
          bakery: [item]
        });
        await newRecipe.save();
      }
    }
  }

  console.log('Database seeded!');
  process.exit();
};

seedDatabase();

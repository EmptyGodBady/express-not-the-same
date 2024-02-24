const mongoose = require('mongoose');
const Recipe = require('./recipeModel.js'); // Убедитесь, что путь к файлу модели указан верно

mongoose.connect('mongodb://localhost:27017/recepiesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Замените данный массив на ваш массив рецептов, исправив неприемлемые значения
const recipes = [{
  mainingredients: ["rise", "grecha", "bulgur", "makarons", "potato"]
},
{
  optionalingredients: ["chiken", "beef", "pork"]
},
 {
   meals: [
     {
       name: "stewed potatoes",
       ingredients: ["potato", "pork", "carrot", "onions", "garlic"],
      },
      {
        name: "plov",
        ingredients: ["rise", "chiken", "carrot", "onions", "garlic"],
      },
      {
        name: "supe",
        ingredients: [
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
        ingredients: [
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
         ingredients: [
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
          ingredients: [
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
          ingredients: [
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
          ingredients: [
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
          ingredients: [
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
      
    } 
    ];
    
    
    const seedDatabase = async () => {
      try {
        // Очистка предыдущих данных, будьте осторожны с этим в продакшене!
        await Recipe.deleteMany({});
        
        // Итерация по массиву recipes для создания документов Recipe
        for (let recipe of recipes) {
          // Предварительное создание объекта для нового рецепта
          let newRecipeData = {
            mainingredients: recipe.mainingredients || [], // Предоставление значений по умолчанию на случай отсутствия данных
            optionalingredients: recipe.optionalingredients || [],
            meals: [],
            bakery: []
          };
    
          // Если в рецепте есть блюда, добавляем их в объект newRecipeData
          if (recipe.meals) {
            newRecipeData.meals = recipe.meals;
          }
    
          // Если в рецепте есть выпечка, добавляем ее в объект newRecipeData
          if (recipe.bakery) {
            newRecipeData.bakery = recipe.bakery;
          }
    
          // Создание и сохранение нового документа Recipe
          const newRecipe = new Recipe(newRecipeData);
          await newRecipe.save();
        }
    
        console.log('Database seeded!');
      } catch (error) {
        console.error('Error seeding database:', error);
      } finally {
        // Завершаем процесс, чтобы не держать соединение с базой данных открытым
        process.exit();
      }
    };
    
    seedDatabase();
    

seedDatabase();

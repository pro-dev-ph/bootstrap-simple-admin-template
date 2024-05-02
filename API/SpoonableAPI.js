const fetch = require('node-fetch-npm');
const Recipe = require('./Recipe');

class SpoonableAPI {
    constructor() {
        this.api_key = "4f8dacc258c84b57be1e22d613b58736";
        this.name = "https://api.spoonacular.com/";
    }

    async findRecipeByIngredients(ingredients) {
        const url = `${this.name}recipes/findByIngredients?ingredients=${ingredients.join(",+")}&number=2&apiKey=${this.api_key}`;
        const filePath = "recipes.json";

        try {
            const response = await fetch(url);
            const data = await response.json();


            const recipeMap = {};
            data.forEach(recipe => {
                recipeMap[recipe.title] = recipe.id;
            });

            return recipeMap;
        } catch (error) {
            console.error(error);
            return {};
        }
    }

    async getRecipeInfo(id) {
        const finalUrl = `${this.name}recipes/${id}/information?includeNutrition=false&addWinePairing=false&addTasteData=false&apiKey=${this.api_key}`;
    
        console.log('Fetching recipe information from:', finalUrl);
    
        try {
            const response = await fetch(finalUrl);
            
            if (!response.ok) {
                throw new Error('Failed to fetch recipe information');
            }
    
            const data = await response.json();
    
          
            // Create Recipe object
            const recipe = new Recipe(data);
    
            return recipe;
        } catch (error) {
            console.error('Error fetching recipe information:', error);
            return null; // Return null or any other appropriate value to indicate failure
        }
    }
}



// Example usage
const spoonableAPI = new SpoonableAPI();
 spoonableAPI.findRecipeByIngredients(["apple", "banana"]).then(recipeMap => {
    console.log(recipeMap);
}); 


spoonableAPI.getRecipeInfo(638604);

spoonableAPI.getRecipeInfo(638604).then(recipe => {
    console.log("Title:", recipe.getTitle());
console.log("Ready in Minutes:", recipe.getReadyInMinutes());
console.log("Servings:", recipe.getServings());
console.log("Source URL:", recipe.getSourceUrl());
console.log("Image URL:", recipe.getImageUrl());
console.log("Summary:", recipe.getSummary());
console.log("Ingredients:", recipe.getIngredients());
console.log("Instructions:", recipe.getInstructions());
console.log("Credits Text:", recipe.getCreditsText());
console.log("Dish Types:", recipe.getDishTypes());
console.log("Diets:", recipe.getDiets());
console.log("Price Per Serving:", recipe.getPricePerServing());
console.log("Health Score:", recipe.getHealthScore());
console.log("Spoonacular Score:", recipe.getSpoonacularScore());
});



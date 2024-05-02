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

    async searchRecipe(query) {
        const url = `${this.name}recipes/complexSearch?query=${query}&maxFat=25&number=2&apiKey=${this.api_key}`;

        try {
            const response = await fetch(url);
            const data = await response.json();


            const recipeMap = {};
            data.results.forEach(recipe => {
                recipeMap[recipe.title] = recipe.id;
            });

            return recipeMap;
        } catch (error) {
            console.error(error);
            return {};
        }
    }


}

module.exports = SpoonableAPI;

// Example usage
const spoonableAPI = new SpoonableAPI();
 spoonableAPI.findRecipeByIngredients(["apple", "banana"]).then(recipeMap => {
    console.log(recipeMap);
}); 

spoonableAPI.searchRecipe("pasta").then(recipeMap => {
    console.log(recipeMap);
}); 


spoonableAPI.getRecipeInfo(638604).then(recipe => {
    recipe.print();
});



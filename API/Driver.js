const SpoonableAPI = require('./SpoonableAPI');

class Driver {
    static async run() {
        const spoonableAPI = new SpoonableAPI();

        // Example: Find recipes by ingredients
        try {
            const recipeMap = await spoonableAPI.findRecipeByIngredients(["tomato", "onion", "spinach", "ranch", "cheese"]);
            console.log("Recipe Map:", recipeMap);
        } catch (error) {
            console.error("Error finding recipes by ingredients:", error);
        }

        // Example: Get recipe by ID
        try {
            const recipe = await spoonableAPI.getRecipe(12345);
            console.log("Recipe:", recipe);
        } catch (error) {
            console.error("Error getting recipe by ID:", error);
        }
    }
}

// Run the driver
Driver.run();

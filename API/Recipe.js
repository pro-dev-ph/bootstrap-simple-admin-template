class Recipe {
    constructor(recipeData) {
        this.data = recipeData;
    }

    getId() {
        return this.data.id;
    }

    getTitle() {
        return this.data.title;
    }

    getReadyInMinutes() {
        return this.data.readyInMinutes;
    }

    getServings() {
        return this.data.servings;
    }

    getSourceUrl() {
        return this.data.sourceUrl;
    }

    getImageUrl() {
        return this.data.image;
    }

    getSummary() {
        return this.data.summary;
    }

    getIngredients() {
        return this.data.extendedIngredients.map(ingredient => {
            return {
                name: ingredient.name,
                amount: ingredient.amount,
                unit: ingredient.unit
            };
        });
    }

    getInstructions() {
        return this.data.instructions;
    }

    getCreditsText() {
        return this.data.creditsText;
    }

    getDishTypes() {
        return this.data.dishTypes;
    }

    getDiets() {
        return this.data.diets;
    }

    getPricePerServing() {
        return this.data.pricePerServing;
    }

    getHealthScore() {
        return this.data.healthScore;
    }

    getSpoonacularScore() {
        return this.data.spoonacularScore;
    }

    // Add more methods as needed based on the data structure
}

module.exports = Recipe;
// Example usage:




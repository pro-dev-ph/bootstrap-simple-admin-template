const Ingredient = require('./Ingredient');

class Recipe {
    constructor(json) {
        try {
            const jsonObject = json;

            // Extracting title
            this.title = jsonObject.title;

            this.sourceURL = jsonObject.sourceUrl;

            // Extracting id
            this.id = jsonObject.id;

            // Extracting ingredients
            const ingredientsArray = jsonObject.extendedIngredients;
            this.ingredients = [];
            for (const obj of ingredientsArray) {
                const { nameClean: name, amount, unit } = obj;
                this.ingredients.push(new Ingredient(name, amount, unit));
            }

            // Extracting instructions
            const analyzedInstructions = jsonObject.analyzedInstructions;
            this.instructions = [];
            for (const instructionObj of analyzedInstructions) {
                const steps = instructionObj.steps;
                for (const stepObj of steps) {
                    const { step } = stepObj;
                    this.instructions.push(step);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    print() {
        console.log(this.title);
        console.log();
        console.log(this.sourceURL);
        console.log();
        console.log("Ingredients:");
        for (const ingredient of this.ingredients) {
            console.log(ingredient.toString());
        }
        console.log();
        console.log("Instructions:");
        for (const instruction of this.instructions) {
            console.log(instruction);
        }
    }
}

module.exports = Recipe;
// Example usage:




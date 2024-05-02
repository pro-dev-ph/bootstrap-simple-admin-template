const fs = require('fs');

class Recipe {
    constructor(title, id, ingredients, sourceURL, instructions) {
        this.title = title;
        this.id = id;
        this.ingredients = ingredients;
        this.sourceURL = sourceURL;
        this.instructions = instructions;
    }

    print() {
        console.log(this.title);
        console.log();
        console.log(this.sourceURL);
        console.log();
        console.log("Ingredients:");
        this.ingredients.forEach(ingredient => {
            console.log(`${ingredient.name}: ${ingredient.amount} ${ingredient.unit}`);
        });
        console.log();
        console.log("Instructions:");
        this.instructions.forEach(instruction => {
            console.log(instruction);
        });
    }

    static fromJson(filepath) {
        const data = fs.readFileSync(filepath);
        const jsonObject = JSON.parse(data);

        const title = jsonObject.title;
        const id = jsonObject.id;
        const sourceURL = jsonObject.sourceUrl;

        const ingredientsArray = jsonObject.extendedIngredients;
        const ingredients = ingredientsArray.map(ingredientObj => ({
            name: ingredientObj.nameClean,
            amount: ingredientObj.amount,
            unit: ingredientObj.unit
        }));

        const analyzedInstructions = jsonObject.analyzedInstructions;
        const instructions = analyzedInstructions.reduce((acc, instructionObj) => {
            const steps = instructionObj.steps;
            const stepTexts = steps.map(stepObj => stepObj.step);
            return acc.concat(stepTexts);
        }, []);

        return new Recipe(title, id, ingredients, sourceURL, instructions);
    }
}

// Example usage: Read recipe data from JSON file and print recipe information
const recipe = Recipe.fromJson('recipe_data.json');
recipe.print();

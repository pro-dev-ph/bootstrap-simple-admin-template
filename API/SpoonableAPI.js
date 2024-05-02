const fs = require('fs');
const https = require('https');

class SpoonableAPI {
    constructor() {
        this.api_key = "4f8dacc258c84b57be1e22d613b58736";
        this.name = "https://api.spoonacular.com/";
    }

    async findRecipeByIngredients(ingredients) {
        const urlBuilder = new URL(this.name + "recipes/findByIngredients");
        urlBuilder.searchParams.append("ingredients", ingredients.join(",+"));
        urlBuilder.searchParams.append("number", "5");
        urlBuilder.searchParams.append("apiKey", this.api_key);

        try {
            const response = await this.getData(urlBuilder);
            const filePath = "recipes.json";
            fs.writeFileSync(filePath, JSON.stringify(response));

            const recipeMap = {};
            response.forEach(recipe => {
                recipeMap[recipe.title] = recipe.id;
            });
            return recipeMap;
        } catch (error) {
            console.error(error);
            return {};
        }
    }

    async getRecipe(id) {
        const urlBuilder = new URL(this.name + "/recipes/" + id + "/information");
        urlBuilder.searchParams.append("includeNutrition", "false");
        urlBuilder.searchParams.append("addWinePairing", "false");
        urlBuilder.searchParams.append("addTasteData", "false");
        urlBuilder.searchParams.append("apiKey", this.api_key);

        try {
            const response = await this.getData(urlBuilder);
            return response;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getData(url) {
        return new Promise((resolve, reject) => {
            https.get(url, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    try {
                        resolve(JSON.parse(data));
                    } catch (error) {
                        reject(error);
                    }
                });
            }).on('error', (error) => {
                reject(error);
            });
        });
    }
}

module.exports = SpoonableAPI;

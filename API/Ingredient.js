class Ingredient {
    constructor(name, amount, unit) {
        this.name = name;
        this.amount = amount;
        this.unit = unit;
    }

    toString() {
        return `${this.amount} ${this.unit} of ${this.name}`;
    }
}

module.exports = Ingredient;
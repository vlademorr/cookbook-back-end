const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipes = {
  title: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  howToCook: {
    type: String,
    required: true
  }
};

const recipesSchema = new Schema(
  {
    ...recipes
  },
  { timestamps: true }
);

const previousRecipesSchema = new Schema({
  ...recipes,
  parentId: {
    type: Schema.Types.ObjectId,
    index: true,
    required: true
  }
});

module.exports = {
  recipesSchema: mongoose.model("recipes", recipesSchema),
  previousRecipesSchema: mongoose.model(
    "previousRecipes",
    previousRecipesSchema
  )
};
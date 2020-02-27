const express = require("express");
const router = express.Router();
const {
  recipesSchema,
  previousRecipesSchema
} = require("../models/recipes-model.js");

/* GET users listing. */
module.exports = function() {
  router.get("/recipes", function(req, res, next) {
    recipesSchema
      .find()
      .sort({ createdAt: -1 })
      .exec()
      .then(data => {
        res.status(200).json(data);
      });
  });
  router.post("/recipes", function(req, res, next) {
    const { recipes } = req.body;
    recipesSchema
      .create(recipes)
      .then(recipes => res.status(201).json(recipes))
      .catch(err => res.status(400).json(err));
  });
  router.put("/recipes/:id", function(req, res, next) {
    const { id } = req.params;
    const { title, ingredients, howToCook } = req.body;
    recipesSchema
      .findByIdAndUpdate(id, {
        title,
        ingredients,
        howToCook
      })
      .exec()
      .then(recipes => {
        return previousRecipesSchema.create({
          title: recipes.title,
          ingredients: recipes.ingredients,
          howToCook: recipes.howToCook,
          parentId: id
        });
      })
      .then(() => res.sendStatus(200))
      .catch(err => res.status(400).json(err));
  });
  return router;
};
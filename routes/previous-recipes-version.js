const express = require("express");
const router = express.Router();
const { previousRecipesSchema } = require("../models/recipes-model");

module.exports = function() {
  router.get("/recipes/previous/:recipesId", (req, res, next) => {
    const { recipesId } = req.params;
    previousRecipesSchema
      .find({ parentId: recipesId })
      .exec()
      .then(recipes => res.status(200).json(recipes))
      .catch(err => res.status(400).json(err));
  });

  return router;
};

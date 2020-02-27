const recipes = require("./recipes.js");
const previousRecipes = require("./previous-recipes-version.js");

module.exports = function(app) {
  app.use("/api", recipes());
  app.use("/api", previousRecipes());
};

const seed = require("../scripts/seed");

module.exports = async function(app) {
  await app.dataSources.db.automigrate();
  console.log("Performed automigration.");
  seed("category", hasError => {
    if (hasError) {
      console.log("Category seeding failed.");
      return;
    }
    seed("shop", hasError => {
      if (hasError) {
        console.log("Shop seeding failed.");
        return;
      }
      console.log("Successful seeding.");
    });
  });
};

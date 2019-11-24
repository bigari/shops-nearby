const seed = require("../scripts/seed");

module.exports = async function(app) {
  await app.dataSources.db.automigrate();
  console.log("Performed automigration.");
  seed("Category", hasError => {
    if (hasError) {
      console.log("Category seeding failed.");
      return;
    }
    seed("Shop", hasError => {
      if (hasError) {
        console.log("Shop seeding failed.");
        return;
      }
      console.log("Successful seeding.");
    });
  });
};

const seed = require("../scripts/seed");

module.exports = async function(app) {
  await app.dataSources.db.autoupdate();
  console.log("Performed autoupdate.");
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

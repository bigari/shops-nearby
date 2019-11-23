const app = require("../server");
const data = require("./dummy-data");

/**
 * Sign in the user with his credentials
 * @param  {String} modelName The model to populate with dummy data
 * @param  {Function(Boolean)} cb Callback to execute with a boolean
 *                             representing wether an error has
 *                             been encountered or not
 */
function seed(modelName, cb) {
  app.models[modelName].destroyAll(err => {
    if (err) {
      console.log(err);
      cb(true);
      return;
    }
    app.models[modelName].create(data[modelName], (err, _) => {
      if (err) {
        console.log(err);
        cb(true);
        return;
      }
      cb(false);
    });
  });
}
module.exports = seed;

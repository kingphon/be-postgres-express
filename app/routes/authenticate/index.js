const cors = require('cors');

module.exports = (app, user) => {
  app.use(cors())

  // const types = require("../../../controllers/classification/type");
  const authenticate = require("../../controllers/authenticate");
  // Create a new Province
  app.post(`/${user}/authenticate`, authenticate.login)

  app.post(`/${user}/logout`, authenticate.logout)

  // app.use(jwt({ secret: config.secret, algorithms: ['HS256'] }));
  // Retrieve all Provinces
  // app.get("/types", types.findAll);

  // // Retrieve a single Province with typeId
  // app.get("/types/:typeId", types.findOne);

  // // Update a Province with typeId
  // app.put("/types/:typeId", types.update);

  // // Delete a Province with typeId
  // app.delete("/types/:typeId", types.delete);

  // // Create a new Province
  // app.post("/types/delete-items", types.deleteItems);
};
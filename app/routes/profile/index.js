const cors = require('cors');

module.exports = (app, ensureAuthenticated, prefix) => {
  app.use(cors())

  const profile = require("../../controllers/profile");


  // Retrieve all Provinces
  app.get(`/${prefix}/profile/avatar`, ensureAuthenticated, profile.getAvatar);

  app.get(`/${prefix}/profile`, ensureAuthenticated, profile.getProfile);

  app.post(`/${prefix}/profile/avatar`, ensureAuthenticated, profile.changeAvatar);

  app.post(`/${prefix}/profile/password`, ensureAuthenticated, profile.changePassword);

  // app.post("/profile/address", ensureAuthenticated, profile.changeAddress);

  // app.post("/profile/email", ensureAuthenticated, profile.changeEmail);

  // app.post("/profile/name", ensureAuthenticated, profile.changeName);

  // // Retrieve all Provinces
  // app.get("/profile-creation", ensureAuthenticated, profile.getAllCreation);

  // // Retrieve a single Province with categoryId
  // app.get("/profile/:categoryId", ensureAuthenticated, profile.findOne);

  // // Update a Province with categoryId
  // app.put("/profile/:categoryId", ensureAuthenticated, profile.update);

  // // Delete a Province with categoryId
  // app.delete("/profile/:categoryId", ensureAuthenticated, profile.delete);

  // // Create a new Province
  // app.post("/profile/delete-items", ensureAuthenticated, profile.deleteItems);
};
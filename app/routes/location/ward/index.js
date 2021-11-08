const cors = require("cors");

module.exports = (app, ensureAuthenticated, prefix) => {
  app.use(cors());

  const wards = require("../../../controllers/location/ward");

  app.post(`/${prefix}/wards`, ensureAuthenticated, wards.create);

  app.get(`/${prefix}/wards`, ensureAuthenticated, wards.findAll);

  app.get(`/${prefix}/wards/:wardId`, ensureAuthenticated, wards.findOne);

  app.put(`/${prefix}/wards/:wardId`, ensureAuthenticated, wards.update);

  app.delete(`/${prefix}/wards/:wardId`, ensureAuthenticated, wards.delete);

  app.post(
    `/${prefix}/wards/delete-items`,
    ensureAuthenticated,
    wards.deleteItems
  );
};

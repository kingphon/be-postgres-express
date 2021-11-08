const cors = require("cors");

module.exports = (app, ensureAuthenticated, prefix) => {
  app.use(cors());

  const districts = require("../../../controllers/location/district");

  app.post(`/${prefix}/districts`, ensureAuthenticated, districts.create);

  app.get(`/${prefix}/districts`, ensureAuthenticated, districts.findAll);

  app.get(
    `/${prefix}/districts-creation/:provinceId`,
    ensureAuthenticated,
    districts.getAllCreationById
  );

  app.get(
    `/${prefix}/districts-creation/`,
    ensureAuthenticated,
    districts.getAllCreation
  );

  app.get(
    `/${prefix}/districts/:districtId`,
    ensureAuthenticated,
    districts.findOne
  );

  app.put(
    `/${prefix}/districts/:districtId`,
    ensureAuthenticated,
    districts.update
  );

  app.delete(
    `/${prefix}/districts/:districtId`,
    ensureAuthenticated,
    districts.delete
  );

  app.post(
    `/${prefix}/districts/delete-items`,
    ensureAuthenticated,
    districts.deleteItems
  );
};

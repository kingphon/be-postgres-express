const cors = require("cors");

module.exports = (app, ensureAuthenticated, prefix) => {
  app.use(cors());

  const provinces = require("../../../controllers/location/province");

  app.post(`/${prefix}/provinces`, ensureAuthenticated, provinces.create);

  app.get(`/${prefix}/provinces`, ensureAuthenticated, provinces.findAll);

  app.get(
    `/${prefix}/provinces-creation`,
    ensureAuthenticated,
    provinces.getAllCreation
  );

  app.get(
    `/${prefix}/provinces/:provinceId`,
    ensureAuthenticated,
    provinces.findOne
  );

  app.put(
    `/${prefix}/provinces/:provinceId`,
    ensureAuthenticated,
    provinces.update
  );

  app.delete(
    `/${prefix}/provinces/:provinceId`,
    ensureAuthenticated,
    provinces.delete
  );

  app.post(
    `/${prefix}/provinces/delete-items`,
    ensureAuthenticated,
    provinces.deleteItems
  );
};

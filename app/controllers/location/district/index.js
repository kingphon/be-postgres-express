const District = require("../../../models/location/district");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const district = new District({
    name: req.body.name,
    slugName: req.body.slugName,
    status: req.body.status,
    provinceId: req.body.provinceId,
  });

  District.create(district, (err) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the District.",
      });
  });
  setTimeout(() => {
    District.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving districts.",
        });
      else res.send(data);
    });
  }, 100);
};

exports.findAll = (req, res) => {
  setTimeout(() => {
    District.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving districts.",
        });
      else res.send(data);
    });
  }, 100);
};

exports.getAllCreationById = (req, res) => {
  District.getAllCreationById(req.params.provinceId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving provinces.",
      });
    else res.send(data);
  });
};

exports.getAllCreation = (req, res) => {
  District.getAllCreation((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving provinces.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  District.findById(req.params.districtId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found District with id ${req.params.districtId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving District with id " + req.params.districtId,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  District.updateById(req.params.districtId, new District(req.body), (err) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found District with id ${req.params.districtId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating District with id " + req.params.districtId,
        });
      }
    }
  });

  setTimeout(() => {
    District.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving districts.",
        });
      else res.send(data);
    });
  }, 100);
};

exports.delete = (req, res) => {
  District.remove(req.params.districtId, (err) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found District with id ${req.params.districtId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete District with id " + req.params.districtId,
        });
      }
    }
  });

  setTimeout(() => {
    District.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving districts.",
        });
      else res.send(data);
    });
  }, 100);
};

exports.deleteItems = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  District.removeItems(req.body, (err) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all districts.",
      });
    else
      setTimeout(() => {
        District.getAll((err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving districts.",
            });
          else res.send(data);
        });
      }, 100);
  });
};

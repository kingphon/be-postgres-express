const Province = require("../../../models/location/province");

// Create and Save a new Province
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Province
  const province = new Province({
    name: req.body.name,
    slugName: req.body.slugName,
    status: req.body.status,
  });

  // Save Province in the database
  Province.create(province, (err) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Province.",
      });
  });
  setTimeout(() => {
    Province.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving provinces.",
        });
      else res.send(data);
    });
  }, 100);
};

// Retrieve all Provinces from the database.
exports.findAll = (req, res) => {
  Province.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving provinces.",
      });
    else res.send(data);
  });
};

// Retrieve all Provinces from the database.
exports.getAllCreation = (req, res) => {
  Province.getAllCreation((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving provinces.",
      });
    else res.send(data);
  });
};

// Find a single Province with a provinceId
exports.findOne = (req, res) => {
  Province.findById(req.params.provinceId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Province with id ${req.params.provinceId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Province with id " + req.params.provinceId,
        });
      }
    } else res.send(data);
  });
};

// Update a Province identified by the provinceId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Province.updateById(req.params.provinceId, new Province(req.body), (err) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Province with id ${req.params.provinceId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Province with id " + req.params.provinceId,
        });
      }
    }
  });
  setTimeout(() => {
    Province.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving provinces.",
        });
      else res.send(data);
    });
  }, 100);
};

// Delete a Province with the specified provinceId in the request
exports.delete = (req, res) => {
  Province.remove(req.params.provinceId, (err) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Province with id ${req.params.provinceId}.`,
        });
        return;
      } else {
        res.status(500).send({
          message: "Could not delete Province with id " + req.params.provinceId,
        });
        return;
      }
    }
  });
  setTimeout(() => {
    Province.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving provinces.",
        });
      else res.send(data);
    });
  }, 100);
};

// Delete all Provinces from the database.
exports.deleteItems = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  Province.removeItems(req.body, (err) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all provinces.",
      });
    else
      Province.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving provinces.",
          });
        else res.send(data);
      });
  });
};

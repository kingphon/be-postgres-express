const Ward = require("../../../models/location/ward");
const District = require("../../../models/location/district");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const ward = new Ward({
    name: req.body.name,
    slugName: req.body.slugName,
    status: req.body.status,
    districtId: req.body.districtId,
  });

  Ward.create(ward, (err) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Ward.",
      });
  });
  setTimeout(() => {
    Ward.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving wards.",
        });
      else res.send(data);
    });
  }, 100);
};

exports.findAll = (req, res) => {
  Ward.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving wards.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  let result = [];
  Ward.findById(req.params.wardId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ward with id ${req.params.wardId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Ward with id " + req.params.wardId,
        });
      }
    } else {
      // District.getAllCreationById(data.provinceId, (err, data) => {
      //   if (err)
      //     res.status(500).send({
      //       message:
      //         err.message || "Some error occurred while retrieving provinces.",
      //     });
      //   else result.push(data);
      // });
      // setTimeout(() => {
        // result.push(data);
        res.send(data);
      // }, 100);
    }
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Ward.updateById(req.params.wardId, new Ward(req.body), (err) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ward with id ${req.params.wardId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Ward with id " + req.params.wardId,
        });
      }
    }
  });
  setTimeout(() => {
    Ward.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving wards.",
        });
      else res.send(data);
    });
  }, 100);
};

exports.delete = (req, res) => {
  Ward.remove(req.params.wardId, (err) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ward with id ${req.params.wardId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Ward with id " + req.params.wardId,
        });
      }
    }
  });
  setTimeout(() => {
    Ward.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving wards.",
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
  Ward.removeItems(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all wards.",
      });
    else
      setTimeout(() => {
        Ward.getAll((err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving wards.",
            });
          else res.send(data);
        });
      }, 100);
  });
};

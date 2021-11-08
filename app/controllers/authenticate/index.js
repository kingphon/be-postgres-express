const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Authenticate = require("../../models/authenticate");
const Profile = require("../../models/profile");

// Create and Save a new Authenticate
exports.login = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const authenticate = new Authenticate({
    phone: req.body.phone,
    password: req.body.password,
  });

  Authenticate.getPassword(authenticate, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred.",
      });
    if (!data) {
      res.status(500).send({
        message: "Phone or password is not correct.",
      });
      return;
    }
    const hashPassword = data;

    bcrypt.compare(authenticate.password, hashPassword, function (err, result) {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred.",
        });

      if (!result) {
        res.status(500).send({
          message: "Phone or password is not correct.",
        });
        return;
      }

      const payload = {
        phone: req.body.phone,
      };

      var token = jsonwebtoken.sign(payload, "keochau", {
        expiresIn: 99999999999999, // expires in 24 hours
      });

      Authenticate.updateToken({ token, authenticate }, (err, data) => {
        if (err) {
          res.status(500).send({
            message: "Some errors occurred.",
          });
          return;
        } else {
          res.cookie("token", token, { httpOnly: true });
          res.json({
            token,
          });
        }
      });
    });
  });
};

// Retrieve all Provinces from the database.
exports.logout = (req, res) => {
  Authenticate.clearToken(req.cookies.token, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving provinces.",
      });
    else {
      // res.clearCookie('token')
      res.send(null);
    }
  });
};

// Retrieve all Provinces from the database.
exports.getAllCreation = (req, res) => {
  Authenticate.getAllCreation((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving provinces.",
      });
    else {
      res.send(data);
    }
  });
};

// Find a single Authenticate with a provinceId
exports.findOne = (req, res) => {
  Authenticate.findById(req.params.provinceId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Authenticate with id ${req.params.provinceId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Authenticate with id " + req.params.provinceId,
        });
      }
    } else res.send(data);
  });
};

// Update a Authenticate identified by the provinceId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Authenticate.updateById(
    req.params.provinceId,
    new Authenticate(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Authenticate with id ${req.params.provinceId}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating Authenticate with id " + req.params.provinceId,
          });
        }
      }
    }
  );
  Authenticate.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving provinces.",
      });
    else res.send(data);
  });
};

// Delete a Authenticate with the specified provinceId in the request
exports.delete = (req, res) => {
  Authenticate.remove(req.params.provinceId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Authenticate with id ${req.params.provinceId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete Authenticate with id " + req.params.provinceId,
        });
      }
    }
  });
  Authenticate.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving provinces.",
      });
    else res.send(data);
  });
};

// Delete all Provinces from the database.
exports.deleteItems = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  Authenticate.removeItems(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all provinces.",
      });
    else
      Authenticate.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving provinces.",
          });
        else res.send(data);
      });
  });
};

const bcrypt = require("bcrypt");

const Profile = require("../../models/profile");

const saltRounds = 8;
exports.getAvatar = (req, res) => {
  Profile.getAvatar(req.cookies.token, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categorys.",
      });
    else res.send(data);
  });
};

exports.getProfile = (req, res) => {
  Profile.getProfile(req.cookies.token, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categorys.",
      });
    else res.send(data);
  });
};

exports.changeAvatar = (req, res) => {
  Profile.changeAvatar(req.cookies.token, req.body.avatar, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categorys.",
      });
    else {
      setTimeout(() => {
        Profile.getProfile(req.cookies.token, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving categorys.",
            });
          else res.send(data);
        });
      }, 300);
    }
  });
};

exports.changeAddress = (req, res) => {
  const token = req.cookies.token;
  const currentPassword = req.body.passwords.currentPassword;
  const newPassword = req.body.passwords.newPassword;
};

exports.changePassword = (req, res) => {
  const token = req.cookies.token;
  const currentPassword = req.body.passwords.currentPassword;
  const newPassword = req.body.passwords.newPassword;
  Profile.getPasswordByToken(token, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred.",
      });
    if (!data) {
      res.status(500).send({
        message: "Token is not correct.",
      });
    }
    const hashPassword = data[0].password;
    bcrypt.compare(currentPassword, hashPassword, function (err, result) {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred.",
        });
      if (!result) {
        res.status(500).send({
          message: "Password is not correct.",
        });
        return;
      }
      bcrypt.hash(newPassword, saltRounds, function (err, hash) {
        Profile.changePassword(token, hash, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while changing password.",
            });
          else {
            Profile.getProfile(token, (err, data) => {
              if (err)
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while getting profile.",
                });
              else res.send(data);
            });
          }
        });
      });
    });
  });
};

const pool = require("../db.js");

const Authenticate = function (authenticate) {
  this.phone = authenticate.phone;
  this.password = authenticate.password;
};

Authenticate.getPassword = (authenticate, result) => {
  pool
    .query(
      `
      SELECT
      password
      FROM users 
      WHERE phone = $1`,
      [authenticate.phone]
    )
    .then((res) => {
      if (res.rows.length) {
        result(null, res.rows[0].password);
        return;
      }
      result(null, null);
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
    });
};

Authenticate.updateToken = ({ token, authenticate }, result) => {
  pool
    .query(
      `
      UPDATE 
      users 
      SET 
      token = $1
      WHERE phone = $2`,
      [token, authenticate.phone]
    )
    .then((res) => {
      if (res.rows.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, null);
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
    });
};

Authenticate.getToken = (token, result) => {
  pool
    .query(
      `
      SELECT
      token
      FROM users 
      WHERE token = $1`,
      [token]
    )
    .then((res) => {
      if (res.rows.length) {
        result(null, res.rows[0]);
        return;
      }
      result(null, []);
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
    });
};

Authenticate.clearToken = (token, result) => {
  pool
    .query(
      `
      UPDATE
      users 
      SET token = '' 
      WHERE token = $1`,
      [token]
    )
    .then((res) => {
      if (res.rows.length) {
        result(null, res.rows[0]);
        return;
      }
      result(null, []);
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
    });
};

module.exports = Authenticate;

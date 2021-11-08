const pool = require("../db.js");

const Profile = () => {};

Profile.getPasswordByToken = (token, result) => {
  pool
    .query(`SELECT password FROM users WHERE token = $1`, [token])
    .then((res) => result(null, res.rows))
    .catch((err) => {
      console.log("error: ", err);
      result(null, err);
    });
};

Profile.getProfile = (token, result) => {
  pool
    .query(
      `
      SELECT 
      u.first_name AS "firstName", 
      u.last_name AS "lastName", 
      u.phone, 
      u.email,
      u.address,
      u.ward_id AS "wardId",
      w.name AS "wardName",
      p.id AS "provinceId",
      p.name AS "provinceName",
      d.id AS "districtId",
      d.name AS "districtName",
      u.create_date AS "createDate", 
      u.update_date AS "updateDate", 
      u.avatar
      FROM users AS u
      INNER JOIN wards AS w 
      ON u.ward_id = w.id
      INNER JOIN districts AS d 
      ON w.district_id = d.id
      INNER JOIN provinces AS p 
      ON d.province_id = p.id
      WHERE token = $1`,
      [token]
    )
    .then((res) => result(null, res.rows[0]))
    .catch((err) => {
      console.log("error: ", err);
      result(null, err);
    });
};

Profile.changeAvatar = (token, avatar, result) => {
  pool
    .query(`UPDATE users SET avatar = $1 WHERE token = $2`, [avatar, token])
    .then((res) => result(null, res.rows))
    .catch((err) => {
      console.log("error: ", err);
      result(null, err);
    });
};

Profile.changePassword = (token, hash, result) => {
  pool
    .query(`UPDATE users SET password = $1 WHERE token = $@`, [hash, token])
    .then((res) => result(null, res.rows))
    .catch((err) => {
      console.log("error: ", err);
      result(null, err);
    });
};

module.exports = Profile;

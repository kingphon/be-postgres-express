const pool = require("../../db.js");

// constructor
const District = function (district) {
  this.name = district.name;
  this.slugName = district.slugName;
  this.status = district.status;
  this.provinceId = district.provinceId;
};

District.create = (newDistrict, result) => {
  pool
    .query(
      `
      INSERT INTO districts (
        name, 
        slug_name,
        status,
        province_id,
        create_date, 
        update_date
        ) VALUES (
          $1, 
          $2,
          $3,
          $4,
          NOW(), 
          NOW()
          ) `,
      [
        newDistrict.name,
        newDistrict.slugName,
        newDistrict.status,
        newDistrict.provinceId,
      ]
    )
    .then(() => result(null, null))
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
    });
};

District.findById = (districtId, result) => {
  pool
    .query(
      `
      SELECT 
      d.id, 
      d.name, 
      d.slug_name AS "slugName", 
      d.status, 
      d.create_date AS "createDate", 
      d.update_date AS "updateDate", 
      p.id  AS "provinceId"
      FROM districts AS d 
      INNER JOIN provinces AS p 
      ON d.province_id = p.id
      WHERE d.id = $1`,
      [districtId]
    )
    .then((res) => {
      if (res.rows.length) {
        result(null, res.rows[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
    });
};

District.getAll = (result) => {
  pool
    .query(
      `
      SELECT 
      d.id, 
      d.name, 
      d.slug_name AS "slugName", 
      d.status, 
      d.create_date AS "createDate", 
      d.update_date AS "updateDate", 
      p.name  AS "provinceName"
      FROM districts AS d 
      INNER JOIN provinces AS p 
      ON d.province_id = p.id`
    )
    .then((res) => result(null, res.rows))
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
    });
};

District.getAllCreationById = (provinceId, result) => {
  pool
    .query(
      `
      SELECT 
      d.id AS value, 
      d.name AS label
      FROM districts AS d
      INNER JOIN provinces AS p
      ON d.province_id = p.id
      WHERE d.status = 'ACTIVE'
      AND p.id = $1`,
      [provinceId]
    )
    .then((res) => result(null, res.rows))
    .catch((err) => {
      console.log("error: ", err);
      result(null, err);
    });
};

District.getAllCreation = (result) => {
  pool
    .query(
      `
      SELECT 
      d.id AS value, 
      d.name AS label
      FROM districts AS d
      WHERE d.status = 'ACTIVE'`
    )
    .then((res) => result(null, res.rows))
    .catch((err) => {
      console.log("error: ", err);
      result(null, err);
    });
};

District.updateById = (id, district, result) => {
  pool
    .query(
      `
      UPDATE 
      districts 
      SET 
      name = $1, 
      slug_name = $2, 
      status = $3, 
      province_id = $4, 
      update_date = NOW() 
      WHERE id = $5`,
      [
        district.name,
        district.slugName,
        district.status,
        district.provinceId,
        id,
      ]
    )
    .then((res) => {
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...district });
    })
    .catch((err) => {
      console.log("error: ", err);
      result(null, err);
    });
};

District.remove = (id, result) => {
  pool
    .query("DELETE FROM districts WHERE id = $1", [id])
    .then((res) => {
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, res);
    })
    .catch((err) => {
      console.log("error: ", err);
      result(null, err);
    });
};

District.removeItems = (deleteItems, result) => {
  pool
    .query("DELETE FROM districts WHERE id = ANY ($1)", [deleteItems])
    .then(() => {
      result(null);
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
    });
};

module.exports = District;

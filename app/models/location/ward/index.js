const pool = require("../../db.js");

// constructor
const Ward = function (ward) {
  this.name = ward.name;
  this.slugName = ward.slugName;
  this.status = ward.status;
  this.districtId = ward.districtId;
};

Ward.create = (newWard, result) => {
  pool
    .query(
      `
      INSERT INTO wards (
        name, 
        slug_name,
        status,
        district_id,
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
      [newWard.name, newWard.slugName, newWard.status, newWard.districtId]
    )
    .then(() => result(null, null))
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
    });
};

Ward.findById = (wardId, result) => {
  pool
    .query(
      `
      SELECT 
      w.id, 
      w.name, 
      w.slug_name AS "slugName", 
      w.status, 
      w.create_date AS "createDate", 
      w.update_date AS "updateDate", 
      p.id AS "provinceId",
      d.id AS "districtId"
      FROM wards AS w 
      INNER JOIN districts AS d 
      ON w.district_id = d.id
      INNER JOIN provinces AS p 
      ON d.province_id = p.id
      WHERE w.id = $1`,
      [wardId]
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

Ward.getAll = (result) => {
  pool
    .query(
      `
      SELECT 
      w.id, 
      w.name, 
      w.slug_name AS "slugName", 
      w.status, 
      w.create_date AS "createDate", 
      w.update_date AS "updateDate", 
      d.name AS "districtName",
      p.name AS "provinceName"
      FROM wards AS w 
      INNER JOIN districts AS d 
      ON w.district_id = d.id
      INNER JOIN provinces AS p 
      ON d.province_id = p.id`
    )
    .then((res) => result(null, res.rows))
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
    });
};

Ward.updateById = (id, ward, result) => {
  pool
    .query(
      `
    UPDATE 
    wards 
    SET 
    name = $1, 
    slug_name = $2, 
    status = $3, 
    district_id = $4, 
    update_date = NOW()
    WHERE id = $5`,
      [ward.name, ward.slugName, ward.status, ward.districtId, id]
    )
    .then((res) => {
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...ward });
    })
    .catch((err) => {
      console.log("error: ", err);
      result(null, err);
    });
};

Ward.remove = (id, result) => {
  pool
    .query("DELETE FROM wards WHERE id = $1", [id])
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

Ward.removeItems = (deleteItems, result) => {
  pool
    .query("DELETE FROM wards WHERE id = ANY ($1)", [deleteItems])
    .then(() => {
      result(null);
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
    });
};

module.exports = Ward;

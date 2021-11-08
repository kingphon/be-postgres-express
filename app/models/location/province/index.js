const pool = require("../../db.js");

// constructor
const Province = function (province) {
  this.name = province.name;
  this.slugName = province.slugName;
  this.status = province.status;
};

Province.create = (newProvince, result) => {
  pool
    .query(
      `
      INSERT INTO provinces (
      name, 
      slug_name,
      status, 
      create_date, 
      update_date
      ) VALUES (
        $1, 
        $2,
        $3, 
        NOW(), 
        NOW()
        ) `,
      [newProvince.name, newProvince.slugName, newProvince.status]
    )
    .then(() => {
      result(null);
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err);
    });
};

Province.findById = (provinceId, result) => {
  pool
    .query(
      `
      SELECT
      id,
      name,
      slug_name AS "slugName",
      status,
      create_date AS "createDate",
      update_date AS "updateDate"
      FROM provinces
      WHERE id = $1`,
      [provinceId]
    )
    .then((res) => {
      result(null, res.rows[0]);
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
    });
};

Province.getAll = (result) => {
  pool
    .query(
      `
      SELECT 
      p.id, 
      p.name, 
      p.slug_name AS "slugName", 
      p.status, 
      p.create_date AS "createDate", 
      p.update_date AS "updateDate"
      FROM provinces AS p
      ORDER BY p.update_date DESC`
    )
    .then((res) => {
      result(null, res.rows);
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
    });
};

Province.getAllCreation = (result) => {
  pool
    .query(
      `
      SELECT
      p.id AS value,
      p.name AS label
      FROM provinces AS p
      WHERE p.status = 'ACTIVE'`
    )
    .then((res) => {
      result(null, res.rows);
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
    });
};

Province.updateById = (id, province, result) => {
  pool
    .query(
      `
      UPDATE
      provinces
      SET
      name = $1,
      slug_name = $2,
      status = $3,
      update_date = NOW()
      WHERE id = $4`,
      [province.name, province.slugName, province.status, id]
    )
    .then((res) => {
      if (res.affectedRows == 0) {
        // not found Province with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null);
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
    });
};

Province.remove = (id, result) => {
  pool
    .query("DELETE FROM provinces WHERE id = $1", [id])
    .then((res) => {
      if (res.affectedRows == 0) {
        // not found Province with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null);
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
    });
};

Province.removeItems = (deleteItems, result) => {
  pool
    .query("DELETE FROM provinces WHERE id = ANY ($1)", [deleteItems])
    .then(() => {
      result(null);
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
    });
};

module.exports = Province;

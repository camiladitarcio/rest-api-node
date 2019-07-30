const QUERY = {
    GET: "SELECT * FROM cars_test",
    POST: "INSERT INTO cars_test (make, year, model, fueltype, trim, colors) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    PUT: "UPDATE cars_test SET make=$1, year=$2, model=$3, fueltype=$4, trim=$5, colors=$6 WHERE id=$7",
    PATCH: "UPDATE cars_test SET make=$1, year=$2, model=$3, fueltype=$4, trim=$5, colors=$6 WHERE id=$7",
    DELETE: "DELETE FROM cars_test WHERE id=$1",
    FIND: "SELECT FROM cars_test WHERE id=$1",
    LAST_ID: "SELECT MAX(id) FROM cars_test"
}
module.exports = QUERY;
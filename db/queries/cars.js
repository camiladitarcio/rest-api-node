const QUERY = {
    GET: "SELECT * FROM cars",
    POST: "INSERT INTO cars (make, year, model, fueltype, trim, colors) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    PUT: "UPDATE cars SET make=$1, year=$2, model=$3, fueltype=$4, trim=$5, colors=$6 WHERE id=$7",
    PATCH: "UPDATE cars SET make=$1, year=$2, model=$3, fueltype=$4, trim=$5, colors=$6 WHERE id=$7",
    DELETE: "DELETE FROM cars WHERE id=$1",
    FIND: "SELECT FROM cars WHERE id=$1",
    LAST_ID: "SELECT MAX(id) FROM cars"
}
module.exports = QUERY;
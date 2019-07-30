const QUERY = {
    GET: "SELECT * FROM client",
    POST: "INSERT INTO client (email, password) VALUES ($1, $2) RETURNING *",
    DELETE: "DELETE FROM client WHERE id=$1",
    FIND: "SELECT * FROM client WHERE email=$1",
}
module.exports = QUERY;

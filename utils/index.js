const db = require('../db');
const QUERY = require('../db/queries/cars');
const QUERYCLIENT = require('../db/queries/client');
const bcrypt = require('bcryptjs');
const { RESPONSE } = require('../routes/responses');

/*  
* busca un elemento según id
* @param id
*/
const findById = async id => {
  const { rowCount } = await db.query(QUERY.FIND, [id]);
  return !(rowCount === 0);
};

/*  
* busca un elemento según mail
* @param mail
*/
const findByEmail = async email => {
  const results = await db.query(QUERYCLIENT.FIND, [email]);
  return results.rows[0];
};

/*
* buscar el último id existente
*/
const getLastId = async () => {
  const results = await db.query(QUERY.LAST_ID);
  return results.rows[0].max;
};

/*
* valida la igualdad y existencia entre schemas/object keys
* @param req.body
* @param carSchema
*/
const isValidSchemaPost = (reqBody, carSchema) => {
  for (let i = 0; i < carSchema.length; i++) {
    if (!(reqBody[carSchema[i]])) {
      return false;
    }
  }
  return true;
}; // post

/*
* valida la igualdad entre schemas/object keys
* @param req.body
* @param carSchema
*/
const isValidSchema = (reqBody, carSchema) => {
  const requestBodyKeys = Object.keys(reqBody);
  for (let i = 0; i < requestBodyKeys.length; i++) {
    if (!(carSchema.includes(requestBodyKeys[i]))) {
      return false;
    }
  }
  return true;
};// put - patch

/*
* valida que el valor de key no sea nulo
* @param req.body
*/
const isNullObject = (obj) => {
  for (let key in obj) {
    if (obj[key] === null || obj[key] === "") {
      return false;
    }
  }
  return true;
};

/*
* valida que el objeto no esté vacío
* @param req.body
*/
const isEmptyObject = reqBody => Object.keys(reqBody).length === 0;

/*
* valida la fecha
* @param year
*/
const isValidYear = (year) => {
  const date = new Date().getFullYear();
  return ((year > 1970 && year <= date) || (!year))
}

/*
* autenthication
* @param password
* @param crypt password
*/
const authentication = (password, cryptPassword) => {
  return new Promise(async (resolve, reject) => {
    bcrypt.compare(password, cryptPassword, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        resolve(true);
      } else {
        reject('Authentication failed');
      }
    });
  })
}

/*
* devuelve un mensaje
* @param status (200,400,401,404)
* @param res
* @param message
*/
const handleResponse = (status, res, message) => {
  if (status === 200) {
      return res.status(200).json(
          RESPONSE.SUCCESFULL_OK(message)
      )
  } else if (status === 400) {
      return res.status(400).json(
          RESPONSE.FAILURE_BAD_REQUEST(message)
      )
  } else if (status === 404) {
      return res.status(404).json(
          RESPONSE.FAILURE_CANT_FIND(message)
      )
  } else if (status === 401) {
    return res.status(401).json(
        RESPONSE.FAILURE_UNAUTHORIZE(message)
    )
}
}


module.exports = { findById, getLastId, isValidSchemaPost, isValidSchema, isEmptyObject, isNullObject, isValidYear, findByEmail, authentication, handleResponse };


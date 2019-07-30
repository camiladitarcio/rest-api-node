const { Client } = require('pg')
const client = new Client({
  host: 'ec2-107-21-216-112.compute-1.amazonaws.com',
  database: 'de5d2d428sfkt',
  port: 5432,
  user: 'vdlqesyvuemkyd',
  password: '2956b0193165c70b3ebd22cc16463e901a38f407c20474f96da2202519710f37',
  ssl: true
})
client.connect();

module.exports = client;

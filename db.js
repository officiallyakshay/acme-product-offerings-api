const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4 } = Sequelize;

const conn = new Sequelize( process.env.DATABASE_URL || 'postgres://localhost/acme_product_offerings_api');

const sync = async () => {
  await conn.sync({force: true});
}

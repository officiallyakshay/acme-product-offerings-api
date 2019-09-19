const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4 } = Sequelize;
const conn = new Sequelize( process.env.DATABASE_URL || 'postgres://localhost/acme_product_offerings_api');


const Product = conn.define('product', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
    allowNull: false
  },
  name: STRING
});

const Company = conn.define('company', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
    allowNull: false
  },
  name: STRING
});

const Offering = conn.define('offering', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
    allowNull: false
  },
  name: STRING
});

Product.belongsTo(Company, {as: 'company'});

Company.hasMany(Product, {foreignKey: 'productId'});

Offering.belongsTo(Product, {as: 'product'});
Offering.belongsTo(Company, {as: 'company'});

Product.hasMany(Offering, {foreignKey: 'offeringId'});
Company.hasMany(Offering, {foreignKey: 'offeringId'});

const mapPromise = (items, model) => {
  return Promise.all(items.map ( item => model.create(item)));
}


const sync = async () => {
  await conn.sync({force: true});


    const products = [
      {name: 'foo'},
      {name: 'bar'},
      {name: 'bazz'},
      {name: 'quq'}
    ]

    const companies = [
      {name: 'The Foo Company'},
      {name: 'The Bar Company'},
      {name: 'The Bazz Company'},
      {name: 'The Quq Company'}
    ]

    const offerings = [
      {name: 'foo'},
      {name: 'bar'},
      {name: 'bazz'},
      {name: 'quq'}
    ]
  };

  module.exports = {
    sync,
    models: {
      Product,
      Company,
      Offering
    }
};

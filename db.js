const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4, DECIMAL } = Sequelize;
const conn = new Sequelize( process.env.DATABASE_URL || 'postgres://localhost/acme_product_offerings_api');


const Product = conn.define('product', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
    allowNull: false
  },
  name: STRING,
  suggestedPrice: DECIMAL
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
  name: STRING,
  price: DECIMAL
});

Offering.belongsTo(Product);
Offering.belongsTo(Company);

// const mapPromise = (items, model) => {
//   return Promise.all(items.map ( item => model.create(item)));
// }

const sync = async () => {
  await conn.sync({ force: true });
    const products = [
      {name: 'foo', suggestedPrice: 8},
      {name: 'bar'},
      {name: 'bazz'},
      {name: 'quq'}
    ]
    const [ foo, bar, bazz, quq ] = await Promise.all(products.map( prod => Product.create(prod)));

    const companies = [
      {name: 'Foofun'},
      {name: 'Badassbar'},
      {name: 'Bazzafrass'},
      {name: 'Luckyquq'}
    ]

    const [ Foofun, Badassbar, Bazzafrass, Luckyquq ] = await Promise.all(companies.map( comp => Company.create(comp)));

    const offerings = [
      {name: 'foofriday', companyId: Foofun.id, productId: foo.id, price: 4},
      {name: 'barz'},
      {name: 'bizzazz'},
      {name: 'quqawar'}
    ]

    const [ foofriday, barz, bizzazz, quqawar ] = await Promise.all(offerings.map( off => Offering.create(off)));
  };

  module.exports = {
    sync,
    models: {
      Product,
      Company,
      Offering
    }
};

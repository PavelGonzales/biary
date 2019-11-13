import Sequelize from 'sequelize';
import sequelizeValues from 'sequelize-values'; 

const sequelize = new Sequelize(
  process.env.PG_DATABASE, 
  process.env.PG_USER, 
  process.env.PG_PASSWORD, 
  {
    host: process.env.PG_HOST,
    dialect: process.env.PG_DIALECT,
    operatorsAliases: false,
    benchmark: true,
    logging: false
  });

sequelizeValues(sequelize);

export default sequelize;
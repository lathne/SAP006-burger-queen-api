'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /*
      Helper method for defining associations.
      This method is not a part of Sequelize lifecycle.
      The `models/index` file will call this method automatically.
    */
    static associate(models) {
      order.belongsToMany(models.products, { as:"Products", foreignKey:"orderId", through: models.orderProducts })
    }
  };
  order.init({
    table: DataTypes.STRING,
    client: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};
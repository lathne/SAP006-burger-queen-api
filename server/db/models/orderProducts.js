'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  orderProducts.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    qtd: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orderProducts',
  });
  return orderProducts;
};
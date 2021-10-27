'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderProducts extends Model {
    static associate(models) {}
  };
  orderProducts.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    qtd: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'orderProducts',
  });
  return orderProducts;
};
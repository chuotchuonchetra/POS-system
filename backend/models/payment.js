'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {

    static associate(models) {
      Payment.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order'
      })
      
    }
  }
  Payment.init({
    orderId: DataTypes.INTEGER,
    paywayTranId: DataTypes.STRING,
    method: DataTypes.STRING,
    status: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    currency: DataTypes.STRING,
    paidAt: DataTypes.DATE,
    rawResponse: DataTypes.JSON,
    remark: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasMany(models.OrderDetail, {
        foreignKey: 'orderId',
        as: 'orderDetails'
      })
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      })
      Order.hasOne(models.Payment, {
        foreignKey: 'orderId',
        as: 'payment'
      })
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    totalAmount: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    paymentMethod: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
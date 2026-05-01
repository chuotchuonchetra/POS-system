'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category'
      })
      // Product.belongsToMany(models.Order, {
      //   through: models.OrderDetail,
      //   as: 'orders',
      //   foreignKey: 'productId',
      //   otherKey: 'orderId'
      // })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
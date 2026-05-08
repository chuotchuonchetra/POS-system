'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        id: 1, name: 'Electronics', products: [
          'Noise Cancelling Headphones', 'Mechanical Keyboard', 'Gaming Mouse', '1080p Webcam', 
          'External 1TB SSD', 'USB-C Docking Station', 'Smart Watch Series 5', 'Bluetooth Speaker', 
          'Wireless Charger Pad', 'HDMI 2.1 Cable'
        ]
      },
      {
        id: 2, name: 'Furniture', products: [
          'Ergonomic Office Chair', 'Standing Desk', 'Bookshelf Unit', 'Side Table', 
          'Table Lamp', 'Velvet Armchair', 'Memory Foam Seat Cushion', 'Wooden Coffee Table', 
          'Floor Mirror', 'Storage Ottoman'
        ]
      },
      {
        id: 3, name: 'Kitchenware', products: [
          'Cast Iron Skillet', 'Non-Stick Frying Pan', 'Professional Chef Knife', 'Electric Kettle', 
          'Silicone Baking Mats', 'Glass Food Containers', 'Bamboo Cutting Board', 'French Press Coffee Maker', 
          'Stainless Steel Mixing Bowls', 'Digital Kitchen Scale'
        ]
      },
      {
        id: 4, name: 'Apparel', products: [
          'Organic Cotton T-Shirt', 'Slim Fit Denim Jeans', 'Hooded Sweatshirt', 'Running Shorts', 
          'Crew Neck Sweater', 'Performance Socks', 'Canvas Tote Bag', 'Baseball Cap', 
          'Rain Jacket', 'Lightweight Windbreaker'
        ]
      }
    ];

    const productSeeds = [];

    data.forEach((cat) => {
      cat.products.forEach((prodName, index) => {
        productSeeds.push({
          name: prodName,
          // Generating realistic prices based on product type
          price: cat.id === 1 ? (40 + index * 10) : (15 + index * 5), 
          discount: (Math.random() * 5).toFixed(2),
          stock: Math.floor(Math.random() * 50) + 10,
          imageUrl: 'https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg',
          categoryId: cat.id,
          description: `High-quality ${prodName} designed for durability and daily use in the ${cat.name} category.`,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
    });

    return queryInterface.bulkInsert('Products', productSeeds);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

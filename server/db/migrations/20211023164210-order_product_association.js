'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(
      'orderProducts',
      {
        orderId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        productId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        qtd: {
          allowNull: false,
          type: Sequelize.INTEGER,
        }, 
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('orderProducts');
  }
};

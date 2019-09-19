const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite:database');

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    order_mass: {
        type: Sequelize.STRING,
        allowNull: false
    },
    order_volume: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    latitude: {
        type: Sequelize.REAL,
        allowNull: false
    },
    longitude: {
        type: Sequelize.REAL,
        allowNull: false
    }
});

const createTables = function() {
    sequelize.sync({ logging: console.log }).then(fullfil => {
        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })

            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    });
};

module.exports.Order = Order;

module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;
module.exports.createTables = createTables;
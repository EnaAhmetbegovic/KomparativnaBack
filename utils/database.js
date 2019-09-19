const model = require('../models/model');

const addOrder = async function (name, surname, mass, volume, address, latitude, longitude) {
    return await model.Order.create({
        name: name,
        surname: surname,
        mass: mass,
        volume: volume,
        address: address,
        latitude: latitude,
        longitude: longitude
    }).then( result => {
        return result.dataValues.id;
    }).catch(err => {
        return console.log(err.message + err);
    });
};

const getAllOrders = async function () {
    return await model.Order
        .findAll()
        .then( rows => {
            var orders = [];
            rows.forEach(function (row) {
                orders.push(row.dataValues.id);
            });
            return orders;
        });
};

const deleteOrder = async function (orderId) {
    return await model.sequelize.query(
        'DELETE FROM Order WHERE id = orderId'
    ).then( result => {
        console.log(result);
        return 0;
    })
};

module.exports = {
    "addOrder": addOrder,
    "getAllOrders": getAllOrders,
    "deleteOrder": deleteOrder

};
const model = require('../models/model');

const addOrder = async function (
    name, surname, orderMass, orderVolume, address, latitude, longitude
) {
    return await model.Order.create({
        name: name,
        surname: surname,
        orderMass: orderMass,
        orderVolume: orderVolume,
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
                orders.push({
                    id : row.dataValues.id,
                    name : row.dataValues.name,
                    surname : row.dataValues.surname,
                    orderMass : row.dataValues.orderMass,
                    orderVolume : row.dataValues.orderVolume,
                    address : row.dataValues.address,
                    latitude : row.dataValues.latitude,
                    longitude : row.dataValues.longitude
                });
            });
            return orders;
        });
};

const getDeliveryRoute = async function () {
    return await model.Order
        .findAll()
        .then(rows => {
            var coordinates = [];
            var ordersCoordinates = [];
            var length = model.Order.length;
            var random = Math.random() * (100) + length;
            var startingPoint = model.Order[random];

            rows.forEach(function (row) {
                coordinates.push({
                    id : row.dataValues.id,
                    latitude : row.dataValues.latitude,
                    longitude : row.dataValues.longitude
                });
            });

            var pomLat = 0;
            var pomLon = 0;

            // Ako je ravna ploča :P
            for (let i = 0; i < length; i++) {
                for (let j = 0; j < length-1; j++) {
                    if (
                        Math.sqrt(
                            coordinates.longitude[i] - coordinates.longitude[j] * coordinates.longitude[i] - coordinates.longitude[j] +
                            coordinates.latitude[i] - coordinates.latitude[j] * coordinates.latitude[i] - coordinates.latitude[j]
                        ) >
                        Math.sqrt(
                            coordinates.longitude[i] - coordinates.longitude[j+1] * coordinates.longitude[i] - coordinates.longitude[j+1] +
                            coordinates.latitude[i] - coordinates.latitude[j+1] * coordinates.latitude[i] - coordinates.latitude[j+1]
                        )
                    ) {
                        pomLat = coordinates.latitude[j+1];
                        pomLon = coordinates.longitude[j+1];
                        coordinates.latitude[j+1] = coordinates.latitude[i];
                        coordinates.longitude[j+1] = coordinates.longitude[i];
                        coordinates.latitude[i] = coordinates.latitude[pomLat];
                        coordinates.longitude[i] = coordinates.longitude[pomLon];
                    }
                }
            }

            for (let i = startingPoint-1; i < length+startingPoint; i++) {
                ordersCoordinates.push({
                    id : (i%coordinates.length).dataValues.id,
                    latitude : (i%coordinates.length).dataValues.latitude,
                    longitude : (i%coordinates.length).dataValues.longitude,
                    route : (i%coordinates.length)+1
                });
            }

            return ordersCoordinates;
        });
};

const deleteOrder = async function (id) {
    model.Order.destroy({
        where: {
            id: id,
        }
    }).then(res => {
        console.log("Order is deleted");
    });
};

module.exports = {
    "addOrder": addOrder,
    "getAllOrders": getAllOrders,
    "deleteOrder": deleteOrder

};

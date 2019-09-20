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

            rows.forEach(function (row) {
                coordinates.push({
                    id : row.dataValues.id,
                    name : row.dataValues.name,
                    surname : row.dataValues.surname,
                    orderMass : row.dataValues.orderMass,
                    orderVolume : row.dataValues.orderVolume,
                    address : row.dataValues.address,
                    latitude : row.dataValues.latitude,
                    longitude : row.dataValues.longitude,
                });
            });

            var ordersCoordinates = [];
            var length = coordinates.length;
            var random = Math.floor(Math.random() * length);
            var Distance = require('geo-distance');

            console.log("Length: " + length);
            console.log("Random: " + random);

            var pomCoordinates = 0;

            var first = {
                lat: 0.0,
                lon: 0.0
            };
            var second = {
                lat: 0.0,
                lon: 0.0
            };
            var third = {
                lat: 0.0,
                lon: 0.0
            };

            for (let i = 0; i < length-1; i++) {
                for (let j = 0; j < length-2-i; j++) {
                    first.lat = coordinates[j].latitude;
                    first.lon = coordinates[j].longitude;
                    second.lat = coordinates[j+1].latitude;
                    second.lat = coordinates[j+1].longitude;
                    third.lat = coordinates[j+2].latitude;
                    third.lat = coordinates[j+2].longitude;

                    if (Distance.between(first, second) > Distance.between(first, third)) {
                        pomCoordinates = coordinates[j+2];
                        coordinates[j+2] = coordinates[j+1];
                        coordinates[j+1] = coordinates[pomCoordinates];
                    }
                }
            }
            var pom = 1;
            for (let i = random; i < (length + random); i++) {

                ordersCoordinates.push({
                    id : coordinates[(i % length)].id,
                    name : coordinates[(i % length)].name,
                    surname : coordinates[(i % length)].surname,
                    orderMass : coordinates[(i % length)].orderMass,
                    orderVolume : coordinates[(i % length)].orderVolume,
                    address : coordinates[(i % length)].address,
                    latitude : coordinates[(i % length)].latitude,
                    longitude : coordinates[(i % length)].longitude,
                    route : pom
                });
                pom++;
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
    "getDeliveryRoute": getDeliveryRoute,
    "deleteOrder": deleteOrder

};

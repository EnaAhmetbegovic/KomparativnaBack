var express = require('express');
var router = express.Router();

const database = require('../utils/database');

router.post('/add', async function (req, res, next) {

  var name = req.body.name;
  var surname = req.body.surname;
  var orderMass = req.body.orderMass;
  var orderVolume = req.body.orderVolume;
  var address = req.body.address;
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;

  const addOrder = await database.addOrder(
      name, surname, orderMass, orderVolume, address, latitude, longitude
  );

  if(addOrder){
    res.send({
      success: true
    })
  } else {
    res.send({
      success: false
    })
  }
});

router.get('/getAll', async function (req, res, next) {
  const all = await database.getAllOrders();
  res.status(200).send({
    list: all
  });
});

router.get('/getDelivery', async function (req, res, next) {
  const all = await database.getDeliveryRoute();
  res.status(200).send({
    list: all
  });
});

router.delete('/delete/:id', function (req, res, next) {
  const id = parseInt(req.params.id);

  database.deleteOrder(id);
});

module.exports = router;

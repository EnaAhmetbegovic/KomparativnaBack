var express = require('express');
var router = express.Router();

const database = require('../utils/database');

router.post('/add', async function (req, res, next) {
  var order = req.body.order;

  var name = order.name;
  var surname = order.surname;
  var orderMass = order.order_mass;
  var orderVolume = order.order_volume;
  var address = order.address;
  var latitude = order.latitude;
  var longitude = order.longitude;

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
    list: all,
    message: 'users retrieved successfully'
  });
});

router.delete('/delete/:id', function (req, res, next) {
  const id = parseInt(req.params.id);

  delete order[id];

  delayedSend(res, '');
});

module.exports = router;
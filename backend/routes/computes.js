const router = require('express').Router();
let Computes = require('../models/compute.model');

router.route('/').get((req, res) => {
    Computes.find()
    .then(costs => res.json(costs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  //const userid = req.body.userid;
  const sum = Number(req.body.sum);
  const year = req.body.year;
  const month = req.body.month;

  const newComputes = new Computes({
    //userid,
    sum,
    year,
    month
  });

  newComputes.save()
  .then(() => res.json('Computes added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
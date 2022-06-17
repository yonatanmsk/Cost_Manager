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

// router.route('/:id').get((req, res) => {
//     Computes.findById(req.params.id)
//     .then(cost => res.json(cost))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/years/:year').get((req, res) => {
//     Computes.find({'year' : req.params.year})
//     .then(cost => res.json(cost))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/months/:month').get((req, res) => {
//     Computes.find({'month' : req.params.month})
//       .then(cost => res.json(cost))
//       .catch(err => res.status(400).json('Error: ' + err));
//   });

// router.route('/year/:year/month/:month').get((req, res) => {

//     Computes.find({'year' : req.params.year, 'month' : req.params.month})
//     .then(cost => res.json(cost))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/username/:username/year/:year/month/:month').get((req, res) => {
//     Computes.find({'username' : req.params.username, 'year' : req.params.year,'month' : req.params.month})
//         .then(cost => res.json(cost))
//         .catch(err => res.status(400).json('Error: ' + err));
//     });

// router.route('/username/:username/year/:year').get((req, res) => {
//     Computes.find({'username' : req.params.username, 'year' : req.params.year})
//         .then(cost => res.json(cost))
//         .catch(err => res.status(400).json('Error: ' + err));
//     });

// router.route('/username/:username/month/:month').get((req, res) => {
//     Computes.find({'username' : req.params.username, 'month' : req.params.month})
//         .then(cost => res.json(cost))
//         .catch(err => res.status(400).json('Error: ' + err));
//     });

// router.route('/usernames/:username').get((req, res) => {
//     Computes.find({'username' : req.params.username})
//         .then(cost => res.json(cost))
//         .catch(err => res.status(400).json('Error: ' + err));
//     });

// router.route('/:id').delete((req, res) => {
//     Computes.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Compute deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update/:id').post((req, res) => {
//     Computes.findById(req.params.id)
//     .then(cost => {
//         cost.user_id = req.body.user_id;
//         cost.sum = Number(req.body.sum);
//         cost.year = Number(req.body.year);
//         cost.month = req.body.month;

//         cost.save()
//         .then(() => res.json('Computes updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;
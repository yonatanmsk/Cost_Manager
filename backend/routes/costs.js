const router = require('express').Router();
let Cost = require('../models/cost.model');
let Computes = require('../models/compute.model');

router.route('/').get((req, res) => {
  Cost.find()
    .then(costs => res.json(costs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const cost_id = req.body.cost_id;
  const username = req.body.username;
  const userid = req.body.userid;
  const description = req.body.description;
  const category = req.body.category;
  const sum = Number(req.body.sum);
  const year = req.body.year;
  const month = req.body.month;

  const newCost = new Cost({
    cost_id,
    username,
    userid,
    description,
    category,
    sum,
    year,
    month
  });

  newCost.save()
  .then(() => res.json('Cost added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Cost.findById(req.params.id)
    .then(cost => res.json(cost))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/years/:year').get((req, res) => {
  Cost.find({'year' : req.params.year})
    .then(cost => res.json(cost))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/months/:month').get((req, res) => {
    Cost.find({'month' : req.params.month})
      .then(cost => res.json(cost))
      .catch(err => res.status(400).json('Error: ' + err));
  });

let tempCost = [];
let computeSum;

router.route('/year/:year/month/:month').get((req, res) => {

Cost.find({'year' : req.params.year, 'month' : req.params.month})
.then(cost => tempCost = cost)/* .then(cost => res.json(cost))*/
.catch(err => res.status(400).json('Error: ' + err));

Computes.findOne({'year' : req.params.year, 'month' : req.params.month})
.then(computes => computeSum = computes)
.catch(err => res.status(400).json('Error: ' + err));

if(computeSum === null)
{
   let sums = 0;
   tempCost.forEach(cost => sums+= cost.sum);
   
   const sum = sums;
   const year = req.params.year;
   const month = req.params.month;

  const newComputes = new Computes({
    sum,
    year,
    month
  });

  newComputes.save();
}

const data = [tempCost, computeSum];

res.json(data);
// res.json(computeSum);

// res.setHeader("Content-Type", "application/json");
// res.end(JSON.stringify({a:JSON.stringify(data[0])}));
//console.log(data[1]);
//res.json({cost:JSON.stringify(tempCost), computes:JSON.stringify(computeSum)});

});

router.route('/username/:username/year/:year/month/:month').get((req, res) => {
    Cost.find({'username' : req.params.username, 'year' : req.params.year,'month' : req.params.month})
        .then(cost => res.json(cost))
        .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/username/:username/year/:year').get((req, res) => {
    Cost.find({'username' : req.params.username, 'year' : req.params.year})
        .then(cost => res.json(cost))
        .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/username/:username/month/:month').get((req, res) => {
    Cost.find({'username' : req.params.username, 'month' : req.params.month})
        .then(cost => res.json(cost))
        .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/usernames/:username').get((req, res) => {
    Cost.find({'username' : req.params.username})
        .then(cost => res.json(cost))
        .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/:id').delete((req, res) => {
    Cost.findByIdAndDelete(req.params.id)
    .then(() => res.json('Cost deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Cost.findById(req.params.id)
    .then(cost => {
        cost.cost_id = req.body.cost_id;
        cost.username = req.body.username;
        cost.user_id = req.body.user_id;
        cost.description = req.body.description;
        cost.category = req.body.category;
        cost.sum = Number(req.body.sum);
        cost.year = Number(req.body.year);
        cost.month = req.body.month;

        cost.save()
        .then(() => res.json('Cost updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;
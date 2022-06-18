const router = require('express').Router();
let Cost = require('../models/cost.model');
let Computes = require('../models/compute.model');
const { v4: uuidv4 } = require('uuid');
let tempCost = [];
let computeSum;

router.route('/').get((req, res) => {
  Cost.find()
    .then(costs => res.json(costs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const cost_id = uuidv4();
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

  Computes.findOne({'year' : year, 'month' : month})
  .then(computes => computes.sum += sum)
  .catch(err => res.status(400).json('Error: ' + err));

  console.log(year);
  console.log(month);
  console.log(sum);
  console.log(computeSum);

  /*if(computeSum !== null)
  {
    computeSum.sum += sum;
  }*/
});

router.route('/:id').get((req, res) => {
  Cost.findById(req.params.id)
    .then(cost => res.json(cost))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/years/:year').get((req, res) => {

  Cost.find({'year' : req.params.year})
    .then(cost => tempCost = cost)
    .catch(err => res.status(400).json('Error: ' + err));
  
  Computes.findOne({'year' : req.params.year, 'month' : 'All'})
  .then(computes => computeSum = computes)
  .catch(err => res.status(400).json('Error: ' + err));
  
  if(computeSum === null)
  {
      let sums = 0;
      tempCost.forEach(cost => sums += cost.sum);
      
      const sum = sums;
      const year = req.params.year;
      const month = 'All';
  
    const newComputes = new Computes({
      sum,
      year,
      month
    });
  
    newComputes.save();
  }
  
  const data = {tempCost, computeSum};
  
  res.json(data);
});

router.route('/year/:year/month/:month').get((req, res) => {

Cost.find({'year' : req.params.year, 'month' : req.params.month})
.then(cost => tempCost = cost)
.catch(err => res.status(400).json('Error: ' + err));

Computes.findOne({'year' : req.params.year, 'month' : req.params.month})
.then(computes => computeSum = computes)
.catch(err => res.status(400).json('Error: ' + err));

if(computeSum === null)
{
   let sums = 0;
   tempCost.forEach(cost => sums += cost.sum);
   
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

const data = {tempCost, computeSum};

res.json(data);
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
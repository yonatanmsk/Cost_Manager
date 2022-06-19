const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const user_id = req.body.user_id;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const birthday = Date.parse(req.body.birthday);
  const marital_status = req.body.marital_status;

  const newUser = new User({username, user_id, firstname, lastname, birthday, marital_status});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/userid/:userid/username/:username').get((req, res) => {

  User.find({ 'username': req.params.username, 'userid': req.params.userid })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;
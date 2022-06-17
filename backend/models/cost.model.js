const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const costSchema = new Schema({
  cost_id: { type: String, required: true},
  username: { type: String, required: true },
  userid: { type: Number, minlength: 1 },
  description: { type: String, required: true },
  category: { type: String, required: true },
  sum: { type: Number, required: true },
  year: {type: Number, required: true},
  month: {type: String, required: true}
}, {
  timestamps: true,
});

const Cost = mongoose.model('Cost', costSchema);

module.exports = Cost;
const mongoose = require('mongoose');
const Shop = require('./Shop');

const Schema = mongoose.Schema;

const balanceSchema = Schema({
	shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
	currency: { type: String },
	sum: { type: Number }
});

const Balance = mongoose.model('Balance', balanceSchema);

module.exports = Balance;
const mongoose = require('mongoose');
const Shop = require('./Shop');

const Schema = mongoose.Schema;

const historySchema = Schema({
	shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
	sum: { type: Number },
	currency: { type: String },
	status: { type: String },
	date: { type: Date, default: new Date }
});

const History = mongoose.model('History', historySchema);

module.exports = History;
const mongoose = require('mongoose');
const Balance = require('./Balance');
const History = require('./History');
const Member = require('./Member');

const Schema = mongoose.Schema;

const shopSchema = Schema({
	user: { type: Schema.Types.ObjectId, ref: 'Member' },
	name: { type: String },
	description: { type: String },
	api_key: { type: String },
	date: { type: Date, default: new Date },
	date_of_removal: Date,
	balance: [{ type: Schema.Types.ObjectId, ref: 'Balance' }],
	history: [{ type: Schema.Types.ObjectId, ref: 'History' }]
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
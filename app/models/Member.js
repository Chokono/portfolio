const mongoose = require('mongoose');
const Shop = require('./Shop');

const Schema = mongoose.Schema;

const memberSchema = Schema({
    _id: { type: String },
    shop: [{ type: Schema.Types.ObjectId, ref: 'Shop' }],
    email: { type: String },
    age: { type: Number, default: 20 },
    name: { type: String, default: 'SomeName' },
    date: { type: Date, default: new Date }
});


const Member = mongoose.model('Member', memberSchema);
module.exports = Member;
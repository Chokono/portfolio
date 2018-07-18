const { isEmail } = require('validator');

let { UTILS } = global.MY1_GLOBAL;
let { Schema } = UTILS.mongoose;

const Shop = require(PATH_TO_MODELS + '/Shop');

let userSchema = new Schema({
    _id: {
        type: String
    },
    age: {
        type: Number,
    },
    userName: {
        type: String,
        required: true,
        min: 2
    },
    userPassword: {
        type: String,
        required: true,
        min: 4
    },
    userEmail: {
        type: String,
        trim: true,
        lowercase: true,
        unique: false,
        required: 'Email address is required',
        validate: [isEmail, 'invalid email']
    },
    userDate: {
        type: Date,
        default: Date.now
    },
    shop: [{
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    }],
});

module.exports = userSchema;


/*

shell

db.users.insert({
    userName: "someuser1",
    userPassword: "1111",
    userEmail: "someuser1@test.com",
    userDate: ISODate("2018-01-16T00:00:00Z")
})

db.Member.insert({
    userName: "someuser1",
    userPassword: "1111",
    userEmail: "someuser1@test.com",
    userDate: ISODate("2018-01-16T00:00:00Z")
})

*/
const mongoose = require('mongoose');
const Order = require('./Order');

const UserSchema = new mongoose.Schema({
    discordId: { type: String, required: true},
    username: { type: String, required: true },
    avatar: { type: String, required: true},
    email: { type: String, required: true},
    oxyUsername: { type: String, required: true},
    password: { type: String, required: true},
    resiOrders: { type: [String], required: true},
    order: { type: [String], required: true },
    expiredOrders: { type: [String], required: true },
    traffic_limit: { type: Number, required: true },
});

const User = module.exports = mongoose.model('User', UserSchema);
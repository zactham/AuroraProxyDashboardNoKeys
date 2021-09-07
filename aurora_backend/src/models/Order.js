const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    ips: { type: String, required: true },
    date: { type: String, required: true },
    amount: { type: String, required: true },
    price: { type: String, required: true },
    token: { type: String, required: true},
    proxies: { type: String, required: true}
});

const order = module.exports = mongoose.model('order', OrderSchema);


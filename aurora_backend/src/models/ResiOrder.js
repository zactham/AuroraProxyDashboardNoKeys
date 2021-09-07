const mongoose = require('mongoose');

const ResiOrderSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    data: { type: Number, required: true },
});

const ResiOrder = module.exports = mongoose.model('ResiOrder', ResiOrderSchema);
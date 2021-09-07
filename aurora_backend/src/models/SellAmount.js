const mongoose = require('mongoose');

const SellAmountSchema = new mongoose.Schema({
    dataLeft: { type: Number, required: true},
    ISPSServerName: { type: String, required: true},
    ISPSDataLimit: { type: Number, required: true},
    ISPSExpiryHours: { type: Number, required: true},
    ISPSPrices: { type: String, required: true},
    orderId: { type: Number, required: true},
    topupdatalimit: { type: Number, required: true},
    topupexpiryhours: { type: Number, required: true}
});

const SellAmount = module.exports = mongoose.model('SellAmount', SellAmountSchema);
const mongoose = require('mongoose');
const uuid4 = require('uuid4');
const schema = mongoose.Schema;

const qrCodeSchema = new schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    },

    qr_id: {
        type: String,
        default: uuid4(),
        required: true,
        unique: true,
    },

    redeemed: {
        type: Boolean,
        default: false,
    },

});


module.exports = mongoose.model('QrCode', qrCodeSchema);
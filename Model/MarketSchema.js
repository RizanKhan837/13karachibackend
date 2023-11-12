const mongoose = require('mongoose');

const MarketSchema = new mongoose.Schema({
    area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Area",
    },

    areaDetails: {
        // Include the details of the area as a nested object
        type: Object,
    },

    name: {
        type: String,
        required: [true, "name is Required"],
    },

    images: [
        {
            type: String,
            required: [true, "images are Required"],
        },
    ],
});

const Market = mongoose.model('Market', MarketSchema, 'Market');

module.exports = Market;

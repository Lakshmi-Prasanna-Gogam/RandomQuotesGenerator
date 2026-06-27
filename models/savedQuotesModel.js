const mongoose = require("mongoose");

const savedQuotesSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quotesUsers",
        required: true
    },
    quote: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("savedQuotes", savedQuotesSchema);
const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({

    quote:{
        type:String
    },

    author:{
        type:String
    },

    userId:{
        type:String
    }

});

module.exports = mongoose.model("Quote",quoteSchema);
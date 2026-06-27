const mongoose = require("mongoose");


const analyticsSchema = new mongoose.Schema(
{

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"quotesUsers",
        required:true
    },


    type:{
        type:String,
        enum:[
            "save",
            "view",
            "share"
        ],
        required:true
    }


},
{
    timestamps:true
});


module.exports = mongoose.model(
    "analytics",
    analyticsSchema
);
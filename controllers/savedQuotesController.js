const savedQuotes = require("../models/savedQuotesModel");
const analytics = require("../models/analyticsModel");



exports.saveQuote = async (req, res) => {

    try {


        const { userId, quote, author } = req.body;


        if (!userId || !quote || !author) {

            return res.status(400).json({
                msg:"Missing fields"
            });

        }



        // save quote

        await savedQuotes.create({

            userId,
            quote,
            author

        });



        // save analytics event

        await analytics.create({

            userId,
            type:"save"

        });



        res.status(201).json({

            msg:"Quote saved successfully."

        });



    }
    catch(err){

        res.status(500).json({

            msg:err.message

        });

    }

};





exports.getSavedQuotes = async (req,res)=>{


    try{


        const {userId}=req.params;



        const quotes = await savedQuotes

        .find({userId})

        .sort({
            createdAt:-1
        });



        res.status(200).json(quotes);


    }
    catch(err){

        res.status(500).json({

            msg:err.message

        });

    }


};






exports.deleteQuote = async(req,res)=>{


    try{


        await savedQuotes.findByIdAndDelete(
            req.params.id
        );


        res.json({

            msg:"Quote deleted"

        });



    }
    catch(err){


        res.status(500).json({

            msg:err.message

        });


    }


};
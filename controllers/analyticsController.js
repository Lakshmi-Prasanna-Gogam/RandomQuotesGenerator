const analytics = require("../models/analyticsModel");

exports.updateAnalytics = async(req,res)=>{

try{

const {userId,type}=req.body;

if(!userId || !type){
return res.status(400).json({
msg:"Missing analytics data"
});
}


const result = await analytics.create({
userId,
type,
createdAt:new Date()
});


console.log("Analytics added:",result);


res.json({
msg:"Analytics updated"
});


}
catch(err){

console.log(err);

res.status(500).json({
msg:err.message
});

}

};



exports.getAnalytics = async(req,res)=>{

try{


const userId=req.params.userId;

const range=req.query.range;


let startDate;
let endDate=new Date();



const now=new Date();



// TODAY

if(range==="day"){


startDate=new Date(
now.getFullYear(),
now.getMonth(),
now.getDate()
);


endDate=new Date(
now.getFullYear(),
now.getMonth(),
now.getDate(),
23,
59,
59,
999
);


}


// LAST 7 DAYS

else if(range==="week"){


startDate=new Date();

startDate.setDate(
now.getDate()-7
);


}


// LAST 30 DAYS

else if(range==="month"){


startDate=new Date();

startDate.setDate(
now.getDate()-30
);


}


// ALL

else{


startDate=new Date(0);


}



const data=await analytics.find({

userId:userId,

createdAt:{

$gte:startDate,

$lte:endDate

}

});



let result={

viewed:0,

saved:0,

shared:0

};



data.forEach(item=>{


if(item.type==="view")
result.viewed++;


if(item.type==="save")
result.saved++;


if(item.type==="share")
result.shared++;


});



console.log(
"Analytics result:",
result
);



res.json(result);



}
catch(err){

res.status(500).json({
msg:err.message
});

}


};
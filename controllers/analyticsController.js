const analytics = require("../models/analyticsModel");


// UPDATE ANALYTICS

exports.updateAnalytics = async(req,res)=>{

try{

const {userId,type}=req.body;


if(!userId || !type){

return res.status(400).json({
msg:"Missing analytics data"
});

}


// createdAt is automatically added by timestamps:true

const result = await analytics.create({

userId,
type

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




// GET ANALYTICS

exports.getAnalytics = async(req,res)=>{

try{


const userId=req.params.userId;

const range=req.query.range;


const now=new Date();


let startDate;
let endDate;



// TODAY

if(range==="day"){


startDate=new Date(

now.getFullYear(),
now.getMonth(),
now.getDate(),
0,
0,
0,
0

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



// YESTERDAY

else if(range==="yesterday"){


startDate=new Date(

now.getFullYear(),
now.getMonth(),
now.getDate()-1,
0,
0,
0,
0

);



endDate=new Date(

now.getFullYear(),
now.getMonth(),
now.getDate()-1,
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


endDate=now;


}



// LAST 30 DAYS

else if(range==="month"){


startDate=new Date();


startDate.setDate(
now.getDate()-30
);


endDate=now;


}



// ALL TIME

else{


startDate=new Date(0);

endDate=now;


}




console.log(
"Range:",
range,
"From:",
startDate,
"To:",
endDate
);




// GET DATA

const data=await analytics.find({

userId:userId,


createdAt:{

$gte:startDate,

$lte:endDate

}


});




// COUNT ANALYTICS

let result={


viewed:0,

saved:0,

shared:0


};



data.forEach(item=>{


if(item.type==="view"){

result.viewed++;

}



if(item.type==="save"){

result.saved++;

}



if(item.type==="share"){

result.shared++;

}


});



console.log(
"Analytics result:",
result
);



res.json(result);



}
catch(err){


console.log(err);
res.status(500).json({
msg:err.message
});
}
};
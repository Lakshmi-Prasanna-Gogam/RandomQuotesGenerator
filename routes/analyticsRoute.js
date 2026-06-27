const express=require("express");

const router=express.Router();

const {
updateAnalytics,
getAnalytics
}=require("../controllers/analyticsController");

router.post(
"/updateAnalytics",
updateAnalytics
);

router.get(
"/analytics/:userId",
getAnalytics
);

module.exports=router;
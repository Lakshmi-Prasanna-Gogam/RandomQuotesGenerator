const express = require("express");
const router = express.Router();

const { saveQuote, getSavedQuotes, deleteQuote } = require("../controllers/savedQuotesController");

router.post("/saveQuote", saveQuote);

router.get("/savedQuotes/:userId", getSavedQuotes);

router.delete("/deleteQuote/:id", deleteQuote);

module.exports = router;
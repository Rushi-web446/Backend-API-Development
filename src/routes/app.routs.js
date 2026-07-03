const express = require("express");
const router = express.Router();

const appC = require("../controllers/app.controller");



router.post("/user", appC.createUser);

router.post("/connect", appC.handleConnect);

router.patch("/connect/respond", appC.handleConnectRespond);

router.post("/rates", appC.handleRates);


// router.post("/rates/search", app.handleSearch);




module.exports = router;
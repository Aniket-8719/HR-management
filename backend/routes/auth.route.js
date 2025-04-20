const express = require('express');
const {
    loginController, 
    registerController, 
    logoutController,
    getUserDetails
    } = require("../controllers/auth.controller");

const {auth} = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/logout", logoutController);
router.post("/login", loginController);
router.get("/me", auth, getUserDetails);
router.post("/register", registerController);

module.exports = router;
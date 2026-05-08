const express = require("express");
const router = express.Router();
const {login,register} = require("../../controllers/user.controller");
const { authMiddleware, roleMiddleware } = require("../middlewares/auth.middleware");

router.post("/login",login);
router.post("/register",
    authMiddleware,roleMiddleware(['admin','owner']),
    register);
module.exports = router;
const express = require('express');
const { createUser, loginUserCtrl, updateUserCtrl } = require('../controller/userCtrl');
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.put("/:id", updateUserCtrl);

module.exports = router;
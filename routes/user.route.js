const {postRegister, postLogin, getProfile} = require("../controllers/user.controller")
const {authMiddleware} = require("../middlewares/aut.middleware")
const express = require("express")

let router = express.Router()




router.route("/register").post(postRegister)
router.route("/login").post(postLogin)
router.route("/profile/:id").get(authMiddleware, getProfile)

module.exports = router
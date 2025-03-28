const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


let postRegister = async (req, res, next) => {
    let body = req.body

    let [existUser, existUserEmail] = await Promise.all([
		User.find({ username: body.username }),
		User.find({ email: body.email }),
	])
	if (existUser.length && existUserEmail.length) {
        throw new Error("Boshqa username va email qo'ying");
    } else if (existUser.length) {
        throw new Error("Boshqa username qo'ying");
    } else if (existUserEmail.length) {
        throw new Error("Boshqa email qo'ying");
    }

    let user = await User.create(body)
    res.status(201).json({message: "Registratsiya qilindi!", user})
}



let postLogin = async (req, res, next) => {
    let body = req.body
    
    let data = await User.findOne({username: body.username}).exec()
    if(!data) return res.send("Ism xato!")

    if(!bcrypt.compareSync(body.password, data.password)) return res.send("Parol xato!")


	const token = jwt.sign({ id: data.id, username: data.username }, process.env.SECRET_KEY, {
		expiresIn: '2d'
	})
    res.status(202).json({message: "Porfilga kirdingiz", data, token})
}


let getProfile = async (req, res, next) => {
    let id = req.user.id
    let user = await User.findOne({_id: id}).exec()
    if(!user) throw new Error("User topilmadi!")
    res.status(200).json({ message: "Sizning profilingiz", user });
}

module.exports = {postRegister, postLogin, getProfile}
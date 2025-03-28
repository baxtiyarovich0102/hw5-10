const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");


let UserSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true, validate: [validator.isEmail, "Noto'g'ti email"]},
        password: {type: String, required: [true, "Parolni kiritish majburiy"]},
        age: {type: Number}
    }
)


UserSchema.pre("save", async function (next) {
    let password = this.password;
    this.password = await bcrypt.hash(password, 12);
    console.log(this.password);
  
    next();
});


let User = mongoose.model('users', UserSchema)

module.exports = User
const mongoose = require("mongoose");
const UserModel = require("../models/userLogin");

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.create({ email, password });

    if (user) {
      return res.status(200).json({ success: true, msg: "" });
    }
    return res.status(200).json({ success: true, allWorkOut });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.signUpUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.SignUp(email, password);
    res.status(200).json({ email, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

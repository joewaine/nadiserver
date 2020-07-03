const User = require("../model/User");

exports.registerNewUser = async (req, res) => {
  try {
    let isUser = await User.find({ email: req.body.email });
    // console.log(isUser);
    if (isUser.length >= 1) {
      return res.status(409).json({
        message: "email already in use"
      });
    }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    let data = await user.save();
    const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
    res.status(201).json({ data, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

exports.addProduct = async (req, res) => {
  try {
      await User.findByIdAndUpdate(
      { _id: req.body.id },
      { $push: { products: req.body.name } }
      );

      const user = await User.findByUserId(req.body.id)
   
      let data = await user.save();
      const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
    res.status(201).json({ user, token });
    // console.log(user)
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

exports.loginUser = async (req, res) => {
  // console.log(123)
  // console.log(req.body)
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .json({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    console.log(res)
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};


exports.getUserProducts = async (req, res) => {
 try {
  const user = await User.findByUserId(req.params.id)
    // console.log(user)
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};


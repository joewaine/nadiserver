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







//get testimonials

exports.getTestimonials = async (req, res) => {




try{
  const user = await User.findByUserEmail(req.params.email)
  
const usertestimonials = user.testimonials

res.status(201).json({ usertestimonials });

}catch{
  res.status(400).json({ err: err });
}


}

//get testimonials






// submit testimonial

exports.submitTestimonial = async (req, res) => {



  const testimonialInfo = {
    title: req.body.title,
    body: req.body.body,
    name: req.body.name
  }


  try {
      await User.findOneAndUpdate(
        {email: req.body.email},
      { $push: { testimonials: testimonialInfo } }
      );



  const user = await User.findByUserEmail(req.body.email)
  
// console.log(user)

    res.status(201).json({ user });



  } catch (err) {
    res.status(400).json({ err: err });
  }
};



// submit testimonial











exports.addProduct = async (req, res) => {
  // console.log('addproduct')
  // console.log(req.body.email)
  // console.log(req.body.name)
  try {
      await User.findOneAndUpdate(
        {email: req.body.email},
      { $push: { products: req.body.name } }
      );



  const user = await User.findByUserEmail(req.body.email)
  
// console.log(user)

    res.status(201).json({ user });



  } catch (err) {
    res.status(400).json({ err: err });
  }
};

exports.loginUser = async (req, res) => {

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
    // console.log(res)
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



exports.getUserInfo = async (req, res) => {

  try {

   const user = await User.findByUserEmail(req.params.email)
     res.status(201).json({ user });
   } catch (err) {


    const user = new User({
      name: 'new user',
      email: req.params.email,
      password: 'password'
    });
    let data = await user.save();
    const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
    res.status(201).json({ data, token });



    //  res.status(400).json({ err: err });
   }
 };
 







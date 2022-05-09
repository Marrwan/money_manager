const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendMail = require('../config/email');
const crypto = require('crypto');
const passwordValidator = require('password-validator');
const { exit } = require('process');

// Create a schema
const schema = new passwordValidator();

const signTOken = (id) => {
    const token =  jwt.sign({ id }, process.env.JWT_SECRET);
  
    return token;
  };

const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ), //* Milliseconds)
    // secure: true,
    httpOnly: true, //? Cookie can NOT be accessed / modified by browser
  };

exports.protect = async (req,res, next) => {
  try{
// Check if token exists in cookies
    const token = req.cookies.token;
    if (!token) return res.status(401).json({   status: 'error', message: 'Unauthorized' });  // 401 Unauthorized
//  Check is token is valid
    const decoded = await jwt.verify(token , process.env.JWT_SECRET);
// Check if user still exists
    const user = await User.findById(decoded.id);
    
    if (!user) return res.status(401).json({   status: 'error', message: 'Unauthorized' });  // 401 Unauthorized
//  Check if user is activated
    if (!user.activated) return res.status(401).json({   status: 'error', message: 'Activate your account' }); // 401 Unauthorized
next()
} catch (error) {
  return res.status(400).json({ status: 'error', message : "Something went wrong"})
}
}

exports.register = async (req,res) => {
try {
  
    const {email, password} = req.body;
    
    if(!email || !password) return res.status(400).json({  status: 'error', message:'Please enter all fields'});
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  function isEmailValid(email) {
    
  
      if(email.length>254)
          return false;
  
      var valid = emailRegex.test(email);
      if(!valid)
          return false;
  
      // Further checking of some things regex can't handle
      var parts = email.split("@");
      if(parts[0].length>64)
          return false;
  
      var domainParts = parts[1].split(".");
      if(domainParts.some(function(part) { return part.length>63; }))
          return false;
  
      return true;
  }

  if(!isEmailValid(email)){
    return res.json({  status : "error", message : "Email is not  valid"});
  }
    schema
.is().min(8)                                    // Minimum length 8
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().symbols()                                // Must have symbols
.has().digits()                                 // Must have digits

if (schema.validate(password)) {
 

//  Check if user exists

    const user = await User.findOne({email});
    if(user) return res.status(400).json({  status: 'error', message:'User already exists'});
//  Create new user
    const newUser = await User.create({email, password});

  
    
    // Generate Account Activation Link
    const activationToken = newUser.createAccountActivationLink();
    
    newUser.save({ validateBeforeSave: false });

    //  Send activation email
    // 4 Send it to Users Email
    const activationURL = `${req.protocol}://${req.get(
      'host'
    )}/verify/${activationToken}`;
    
    const message = `GO to this link to activate your FYP ${activationURL} .Account`;
    
    sendMail({
      email,
      message,
      subject: 'Your Account Activation Link for FYP App !',
      user: newUser,
      url: activationURL,
    });
    
    res.status(200).json({
      status: 'success',
    message: "Check your email to activate your account",
    });
} else {
    res.status(400).json({
      status: 'error',
      message: 'Password must be at least 8 characters long, must contain lowercase, uppercase, digits and symbols',
    });
}
} catch (error) {
  console.log(error)
    return res.status(400).json({  status: 'error', message:'Something went wrong'});
}
  }

exports.login = async (req,res) => {
  try{
    let {email, password} = req.body;
  
 
    if(!email || !password) return res.status(400).json({  status: 'error', message:'Please enter all fields'});
    email = email.toLowerCase();

    const user = await User.findOne({email});

    if(!user) return res.status(400).json({  status: 'error', message:'User does not exist'});
    const isMatch = await user.comparePassword(password, user.password);

    if(!isMatch) return res.status(400).json({  status: 'error', message:'Incorrect Password'});
    if(!user.activated) return res.status(400).json({  status: 'error', message:'Please activate your account'});
  
    const token = signTOken(user._id);
    if(process.env.NODE_ENV !== "development") cookieOptions.secure = true;
    res.cookie('token', token, cookieOptions);
    // res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
    res.status(200).json({
      status: 'success',
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    return res.status(400).json({ status: 'error', message : "Something went wrong", info : error.message})
  }
}

exports.verify = async (req,res) => {
  try{
    const { token } = req.params;

    const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  
    const user = await User.findOne({
      'activationLink': hashedToken});
  
    if (!user) return res.status(400).json({   status: 'error', message: 'Token is invalid or has expired' });
  
    user.activationLink = undefined;
    user.activated= true;
    await user.save({validateBeforeSave: false});
  
    res.status(200).render('emailconfirm');
  } catch (error) {
    return res.status(400).json({ status: 'error', message : "Something went wrong"})
  }
}
exports.logout = async (req,res) => {
    res.clearCookie('token');
    res.status(200).json({
      status: 'success',
      data: {
        message: 'Logged out successfully',
      },
    });
  }

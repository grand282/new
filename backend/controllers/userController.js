const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../modals/usersModal.js');

const registerUser = asyncHandler(async(req,res) => {
    const { name, phone, password } = req.body

  if (!name || !phone || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ phone })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    phone,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      phone: user.phone,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const loginUser = asyncHandler(async(req,res) => {
    const {phone, password} = req.body

// check for user phone
    const user = await User.findOne({phone})

    if(user && (await bcrypt.compare(password, user.password))){
      res.status(201).json({
        _id: user.id,
        name: user.name,
        phone: user.phone,
        token: generateToken(user._id),
      })
    }else{
      res.status(400)
      throw new Error('Invalid user data')
    }
});

const getMe = asyncHandler(async(req,res) => {
    const { _id, name, phone } = await User.findById(req.user.id)

    res.status(200).json({
      id: _id,
      name,
      phone
    })
})

// Generate a token

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '3d',
  })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}
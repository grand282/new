const asyncHandler = require('express-async-handler');
const Location = require('../modals/locationModal.js');
const User = require('../modals/usersModal.js');
const mongoose = require('mongoose');

const getLocations = asyncHandler(async(req,res) =>{
    const locations = await Location.find({ user: req.user.id})
    res.status(200).json(locations)
});

const setLocations = asyncHandler(async(req,res) =>{
  const { province, townOrCity, bedroomNumber } = req.body;
  
    if(!req.body){
        res.status(400)
        throw new Error('please add a text field');
    }

    const location = await Location.create({
        province,
        price,
        townOrCity,
        bedroomNumber,
        user: req.user.id,
    })
    const savedLocation = await location.save();

    res.status(200).json(savedLocation)
});
const updateLocations = asyncHandler(async(req,res) =>{
  const location = await Location.findById(req.params.id)

  if (!location) {
    res.status(400)
    throw new Error('location not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (location.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedLocation = await Location.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedLocation)
});

const deleteLocations = asyncHandler(async(req,res) =>{
  const location = await Location.findById(req.params.id).exec();

  if (!location) {
    res.status(400)
    throw new Error('Location not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('Location not found')
  }

  // Make sure the logged in user matches the goal user
  if (location.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await location.deleteOne()

  res.status(204).json({ id: req.params.id })
});



module.exports = {
    getLocations,
    setLocations,
    updateLocations,
    deleteLocations
}
const express = require('express');
const router = express.Router();
const { getLocations,setLocations,updateLocations,deleteLocations} = require('../controllers/locationController.js');
const {protect} = require('../middleware/authMiddleware.js')

router.route('/').get(protect, getLocations).post(protect, setLocations);
router.route('/:id').put(protect, updateLocations).delete(protect, deleteLocations);

module.exports = router
const express = require('express');
const router = express.Router();
const droneControl = require('../control');

router.get('/', droneControl.getDrones);
router.get('/:id', droneControl.getDroneById);
router.post('/', droneControl.createDrone);
router.put('/:id', droneControl.updateDroneById);
router.delete('/:id', droneControl.deleteDroneById);

module.exports = router;

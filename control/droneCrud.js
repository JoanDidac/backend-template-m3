import React from "react";
const Drone = require('../models/Drone');

// all drones
exports.getDrones = async (req, res) => {
    try {
        const drones = await Drone.find();
        res.status(200).json(drones);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching drones' });
      }
  };
  
  // single drone by ID
  exports.getDroneById = async (req, res) => {
    // Your logic to fetch a drone by ID
  };
  
  // Create drone
  exports.createDrone = async (req, res) => {
    // Your logic to create a new drone
  };
  
  // Update drone by ID
  exports.updateDroneById = async (req, res) => {
    // Your logic to update a drone by ID
  };
  
  // Delete drone by ID
  exports.deleteDroneById = async (req, res) => {
    // Your logic to delete a drone by ID
  };
  
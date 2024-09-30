const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Deposition = require('../models/deposition');

const router = express.Router();

// Middleware to verify JWT (optional)
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from header
    if (token) {
      jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user; // Save user info to request object
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };
  
  // POST route to create a new deposition
  router.post('/depositions', authenticateJWT, async (req, res) => {
    try {
      const deposition = new Deposition({
        userId: req.user.id, // Assuming you're storing user ID in the JWT
        type: req.body.type,
        apparelTypes: req.body.apparelTypes,
        subtypes: req.body.subtypes,
        quantities: req.body.quantities,
        comments: req.body.comments,
        conditions: req.body.conditions, // Add conditions field
        disposalType: req.body.disposalType, // Add disposal type field
        donationAmount: req.body.donationAmount,
        files: req.body.files,
      });
      
      await deposition.save();
      res.status(201).json({ message: 'Deposition created successfully', deposition });
    } catch (error) {
      res.status(400).json({ error: 'Error creating deposition', details: error.message });
    }
  });
  
  // GET route to retrieve all depositions for a specific user
  router.get('/depositions', authenticateJWT, async (req, res) => {
    try {
      const depositions = await Deposition.find({ userId: req.user.id }); // Fetch depositions for the authenticated user
      res.status(200).json(depositions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching depositions', details: error.message });
    }
  });
  

module.exports = router;

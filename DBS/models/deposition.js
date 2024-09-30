const mongoose = require('mongoose');

// Define the schema for a deposition
const depositionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Assuming you have a User model
  },
  type: {
    type: String,
    enum: ['Donation', 'Recycle', 'Dispose'],
    required: true
  },
  apparelTypes: {
    type: [String],
    required: true
  },
  subtypes: {
    type: [String],
    required: true
  },
  quantities: {
    type: Map,
    of: Number, // Use a Map to store subtype and corresponding quantity
    required: true
  },
  comments: {
    type: Map,
    of: String // Use a Map to store subtype and corresponding comments
  },
  conditions: {
    type: Map,
    of: String, // Store the condition for each subtype
    enum: ['New', 'Gently used', 'Worn out', 'Damaged'], // Restrict possible values
    required: true
  },
  disposalType: {
    type: String,
    enum: ['pickup', 'drop'], // Either home pickup or drop at center
    required: true
  },
  donationAmount: {
    type: Number,
    default: 0 // Set a default value if applicable
  },
  files: {
    type: Map,
    of: String // Store file paths or identifiers if uploading files
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically set the creation date
  }
});

module.exports = mongoose.model('Deposition', depositionSchema);

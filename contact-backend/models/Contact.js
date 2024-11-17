const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  company: String,
  jobTitle: String,
});

module.exports = model('Contact', contactSchema);
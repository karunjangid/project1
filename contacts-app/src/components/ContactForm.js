import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Grid2,
} from '@mui/material';

const ContactForm = ({ addContact }) => {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
  });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contact.firstName && contact.lastName && contact.email) {
      addContact({ ...contact, id: Date.now() });
      setContact({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid2 container spacing={2}>
        <Grid2 item xs={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={contact.firstName}
            onChange={handleChange}
            required
          />
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={contact.lastName}
            onChange={handleChange}
            required
          />
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            required
          />
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
            fullWidth
            label="Company"
            name="company"
            value={contact.company}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
            fullWidth
            label="Job Title"
            name="jobTitle"
            value={contact.jobTitle}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Add Contact
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ContactForm;

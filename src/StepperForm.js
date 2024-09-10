import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, TextField, Box, Typography } from '@mui/material';

const steps = ['Step 1: Personal Information', 'Step 2: Address Details', 'Step 3: Review and Submit'];

function StepperForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
  });

  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    alert('Form submitted!');
    // Handle form submission logic here
  };

  return (
    <div style={{ padding: '20px' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === 0 && (
          <Box mt={2}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Box>
        )}
        {activeStep === 1 && (
          <Box mt={2}>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Box>
        )}
        {activeStep === 2 && (
          <Box mt={2}>
            <Typography variant="h6">Review your information:</Typography>
            <Typography>Name: {formData.name}</Typography>
            <Typography>Email: {formData.email}</Typography>
            <Typography>Address: {formData.address}</Typography>
            <Typography>City: {formData.city}</Typography>
          </Box>
        )}
        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleBack}
            disabled={activeStep === 0}
            style={{ marginRight: '10px' }}
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </Box>
      </div>
    </div>
  );
}

export default StepperForm;

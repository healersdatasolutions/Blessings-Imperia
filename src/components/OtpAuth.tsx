import React, { useState } from 'react';
import './OtpAuth.css'; // Assuming you will style using CSS

function OtpAuth() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOtp = async () => {
    // Logic to request OTP
    setMessage('OTP sent to your phone');
  };

  const handleVerifyOtp = async () => {
    // Logic to verify OTP
    setMessage('Phone number verified successfully!');
  };

  return (
    <div className="otp-container">
      <h1>Sign In</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter your mobile number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={handleSendOtp}>Send OTP</button>
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={handleVerifyOtp}>Verify OTP</button>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default OtpAuth;

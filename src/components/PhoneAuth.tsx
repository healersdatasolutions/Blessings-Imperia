import React, { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Adjust the path according to your project structure

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, auth);
  };

  const sendOTP = () => {
    setUpRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setVerificationId(confirmationResult.verificationId);
      }).catch((error) => {
        console.error("SMS not sent", error);
      });
  };

  const verifyOTP = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
    auth.signInWithCredential(credential)
      .then((result) => {
        console.log("User signed in", result.user);
      }).catch((error) => {
        console.error("Error while verifying OTP", error);
      });
  };

  return (
    <div>
      <div id="recaptcha-container"></div>
      <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Enter phone number" />
      <button onClick={sendOTP}>Send OTP</button>
      <br />
      <input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="Enter OTP" />
      <button onClick={verifyOTP}>Verify OTP</button>
    </div>
  );
};

export default PhoneAuth;

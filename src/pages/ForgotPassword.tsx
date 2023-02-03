import axios, { AxiosResponse } from 'axios';
import React, { useRef, useState } from 'react';
import { Alert, Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const email = emailRef.current?.value;
    setErrorMessage('');
    setSuccessMessage('');

    if (email) {
      try {
        const response: AxiosResponse = await axios.post(
          'http://localhost:8080/api/auth/password/forgot',
          { email }
        );
        console.log('Forgot Password - Response : ', response.data);
        setSuccessMessage('Un email vous a été envoyé');
      } catch (error: any) {
        console.log('Forgot Password - Error : ', error);
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <Container>
      <Link to={'/'} className='text-center'>
        <img
          src='/assets/Logo.png'
          alt='logo'
          style={{ width: '200px' }}
          className='mb-5'
        />
      </Link>
      <h2 className='mb-3'>Mot de passe oublié ?</h2>
      <p className='mb-4'>
        Entrez votre adresse email ci-dessous et nous vous enverrons un lien
        pour réinitialiser votre mot de passe
      </p>
      <FloatingLabel label='Entrer votre email' className='mb-3'>
        <Form.Control
          ref={emailRef}
          type='email'
          placeholder='Entre votre email'
        />
      </FloatingLabel>
      <Button className='forgot-btn mb-3' onClick={handleSubmit}>
        Valider
      </Button>
      {successMessage && <Alert variant='success'>{successMessage}</Alert>}
      {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
    </Container>
  );
};

export default ForgotPassword;

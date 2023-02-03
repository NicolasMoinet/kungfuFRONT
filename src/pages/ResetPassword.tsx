import axios, { AxiosResponse } from 'axios';
import React, { useRef, useState } from 'react';
import { Alert, Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { errorInfo } from '../models/form-validate/errorMessage';
import { isValid } from '../models/form-validate/validation';
import './ResetPassword.css';

let id = '';
let token = '';

const ResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [errorApiMessage, setErrorApiMessage] = useState<string[]>([]);

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const { handleToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  // On récupère les search Params (tout ce qu'il y a dans l'url à partir du ?)
  console.log('Reset Password - Location : ', location.search);

  // Cette classe permet d'obtenir un tableau de toutes les paires key/value des search Params (la clé est ce qu'il y a à gauche du "=" et la valuer ce qu'il y a à droite) séparés par un "&"
  const searchParams = new URLSearchParams(location.search);

  // Pour chaque paire, on met à jour nos variables
  searchParams.forEach((param, i) => {
    console.log('key', i);
    if (i === 'id') {
      id = param;
    }
    if (i === 'token') {
      token = param;
    }
  });
  console.log('Reset Password - Param Id : ', id);
  console.log('Reset Password - Param Token : ', token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage('');
    setErrorApiMessage([]);

    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (password) {
      if (!isValid('password', password)) {
        setErrorMessage(errorInfo('password'));
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage('Combinaison de mot de passe incorrecte');
        return;
      }

      try {
        // On passe dans l'url nos variables récupérées pour vérifier qu'elles appartiennent bien à l'utilisateur qui fait la demande de nouveau mot de passe
        const response: AxiosResponse = await axios.post(
          `http://localhost:8080/api/auth/password/reset/${id}/${token}`,
          { password }
        );
        console.log('Reset Password - Response : ', response.data);
        handleToast({
          message:
            'Votre nouveau mot de passe a bien été enregistré ! Vous pouvez vous reconnecter',
          color: 'success',
          delay: 3000,
        });
        navigate('/connexion');
      } catch (error: any) {
        console.log('Forgot Password - Error : ', error);
        setErrorApiMessage(error.response.data.message);
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
      <h2 className='mb-3'>Création de votre nouveau mot de passe</h2>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel
          className='mb-3'
          label='Entrer votre nouveau mot de passe'
        >
          <Form.Control
            type='password'
            placeholder='Entrer votre nouveau mot de passe'
            ref={passwordRef}
          />
        </FloatingLabel>
        <FloatingLabel
          className='mb-3'
          label='Confirmer votre nouveau mot de passe'
        >
          <Form.Control
            type='password'
            placeholder='Confirmer votre nouveau mot de passe'
            ref={confirmPasswordRef}
          />
        </FloatingLabel>
        <Button type='submit' className='reset-btn mb-3'>
          Valider
        </Button>
        {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
        {errorApiMessage &&
          errorApiMessage.map((error, i) => (
            <Alert key={i} variant='danger'>
              {error}
            </Alert>
          ))}
      </Form>
    </Container>
  );
};

export default ResetPassword;

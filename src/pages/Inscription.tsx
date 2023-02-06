import { FormEvent, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Alert,
} from 'react-bootstrap';
import { isValid } from '../models/form-validate/validation';
import { errorInfo } from '../models/form-validate/errorMessage';
import { useToast } from '../context/ToastContext';
import './Inscription.css';

const Inscription = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [apiErrorMessage, setApiErrorMessage] = useState<string[]>([]);

  const { handleToast } = useToast();
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    setApiErrorMessage([]);

    if (email.current?.value && !isValid('email', email.current.value)) {
      setErrorMessage(errorInfo('email'));
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return;
    }

    if (
      password.current?.value &&
      !isValid('password', password.current.value)
    ) {
      setErrorMessage(errorInfo('password'));
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return;
    }

    if (password.current?.value !== confirmPassword.current?.value) {
      setErrorMessage('Combinaison de mot de passe incorrecte');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return;
    }

    let userIn = {
      email: `${email.current?.value}`,
      password: `${password.current?.value}`,
      name: `${name.current?.value}`,
    };

    axios
      .post('http://localhost:8080/api/auth/register', userIn)
      .then((response) => {
        let userData = response.data;

        console.log('Inscription - HandleSubmit - Reponse : ', userData);
        if (response.status === 201) {
          handleToast({
            message:
              'Inscription reussie, vous pouvez maintenant vous identifier',
            color: 'success',
            delay: 3000,
          });
          navigate('/connexion');
        }
      })
      .catch((error) => {
        console.log('Inscription - HandleSubmit - Error : ', error);
        setApiErrorMessage(error.response.data.message);
      });
  };

  return (
    <>
      <Container className='container'>
        <Row>
          <Col>
            <h2 className='inscription-title mb-4 '>Inscription</h2>
            <h3 className='account-header mb-4'>Informations générales</h3>

            <Form onSubmit={handleSubmitForm} className='mb-3'>
              <FloatingLabel label='Email' className='mb-3'>
                {' '}
                <Form.Control
                  ref={email}
                  type='email'
                  placeholder='Email'
                  required
                />
                <Form.Text className='text-muted'>
                  Nous ne comuniquerons jamais votre Email. Never ever ! Nous
                  utiliserons vos données par contre. Merci d'avance.
                </Form.Text>
              </FloatingLabel>
              <FloatingLabel label='Mot de passe' className='mb-3'>
                {' '}
                <Form.Control
                  type='password'
                  placeholder=' Mot de passe'
                  ref={password}
                  required
                />
                <Form.Text className='d-block'>
                  Minimum 8 caractères, une majuscule, une minuscule, un chiffre
                  et un caractère spécial
                </Form.Text>
              </FloatingLabel>
              <FloatingLabel
                label='Confirmer votre mot de passe'
                className='mb-3'
              >
                <Form.Control
                  type='password'
                  placeholder='Confirmer votre mot de passe'
                  ref={confirmPassword}
                  required
                />
              </FloatingLabel>

              <FloatingLabel label='Pseudo' className='mb-3'>
                {' '}
                <Form.Control
                  ref={name}
                  type='text'
                  placeholder='Pseudo'
                  required
                />
              </FloatingLabel>

              <Button className='button-signup mb-3' type='submit'>
                Envoyer
              </Button>
              <div>
                <Form.Text>
                  Déjà un compte ? <Link to='/connexion'>Identifiez-vous</Link>
                </Form.Text>
              </div>
            </Form>
            {/* S'il y a un message d'erreur, on l'affiche dans un Alert */}
            {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
            {apiErrorMessage &&
              apiErrorMessage.map((error, i) => (
                <Alert key={i} variant='danger'>
                  {error}
                </Alert>
              ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Inscription;

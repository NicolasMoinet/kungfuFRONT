import { Alert, Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import { FormEvent, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Connexion.css';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Connexion = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [errMsg, setErrorMsg] = useState('');
  const [redirectMessage, setRedirectMessage] = useState('');

  // On récupère depuis le context, la fonction pour enregistrer le user qui se connecte.
  // Ce user et (donc toutes ses propriétés) sera ainsi accessible partout dans l'application sans avoir à faire d'appel api
  const { checkLogin } = useAuth();

  const navigate = useNavigate();

  // Ce hook de react-router-dom permet de sur quel route (pathname) on se trouve
  const location = useLocation();

  // On récupère, depuis le context, la fonction qui met à jour le toast
  const { handleToast } = useToast();

  // Dans le composant RequireAuth.tsx, s'il n'y a pas de user connecté, on a paramétré le composant Navigate avec une props "state" qui permet d'enregistrer la location de la page sur laquelle on se trouvait. En arrivant sur la page connexion, on peut ainsi savoir sur quelle page on se trouvait avant d'être redirigé.
  const fromWhichPage = location.state?.from?.pathname;

  useEffect(() => {
    if (fromWhichPage === '/admin') {
      setRedirectMessage(
        "Vous n'avez pas les droits pour accéder à cette page"
      );
      setTimeout(() => {
        setRedirectMessage('');
      }, 5000);
      return;
    }
    if (location.state) {
      setRedirectMessage(
        "Il faut d'abord vous connecter pour accéder à cette page"
      );
      setTimeout(() => {
        setRedirectMessage('');
      }, 5000);
      return;
    }
  }, [location.state, fromWhichPage]);

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    let userInCo = {
      email: email.current?.value,
      password: password.current?.value,
    };

    axios
      .post('http://localhost:8080/api/auth/login', userInCo)
      .then((response) => {
        console.log('login reponse ', response);

        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);

        if (response.status === 201) {
          handleToast({
            message: 'Authentification réussie. Bon retour parmis nous !',
            color: 'success',
            delay: 5000,
          });

          // On lance cette fonction du AuthContext pour récupérer le user caché dans le payload de l'accessToken et mettre à jour notre currentUser avec
          checkLogin();

          navigate('/user/interface');
        }
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
        console.log('login error:', error);
      });
  };

  return (
    <Container className='connexion-container'>
      {redirectMessage && (
        <Alert variant='warning' className='my-3'>
          {redirectMessage}
        </Alert>
      )}
      <h2 className='mb-3'>Connexion</h2>

      <form onSubmit={handleSubmitForm}>
        <FloatingLabel label='Adresse email' className='mb-3'>
          <Form.Control ref={email} type='email' />
          <Form.Text className='text-muted'>
            Nous ne communiquerons jamais votre Email.
          </Form.Text>
        </FloatingLabel>
        <FloatingLabel label='Mot de passe' className='mb-3'>
          <Form.Control ref={password} type='password' />
          <Form.Text>
            <Link to='/password/recover'>Mot de passe oublié ?</Link>
          </Form.Text>
        </FloatingLabel>
        <Button className='button-signin mb-3' type='submit'>
          Envoyer
        </Button>
        <div>
          <Form.Text>
            Pas de compte ? <Link to='/inscription'>Inscrivez-vous</Link>
          </Form.Text>
        </div>
        {errMsg && <Alert variant='danger'>{errMsg}</Alert>}
      </form>
    </Container>
  );
};

export default Connexion;

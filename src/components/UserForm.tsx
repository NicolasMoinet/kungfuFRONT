import React, { useEffect, useRef, useState } from 'react';

import { Alert, Button, FloatingLabel, Form } from 'react-bootstrap';
import { UserType } from '../models/interface/User';

import { useAuth } from '../context/AuthContext';
import './UserForm.css';
import { isValid } from '../models/form-validate/validation';
import { errorInfo } from '../models/form-validate/errorMessage';

interface UserFormProps {
  onFormSubmit: { (formData: UserType): void };
}

const UserForm = ({ onFormSubmit }: UserFormProps) => {
  
  const [errorMessage, setErrorMessage] = useState<string>('');

   // On récupère, dans le context, le user connecté (qui est censé être un admin)
  const { currentUser } = useAuth();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
   const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);



  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailInput = emailRef.current?.value;
    const passwordInput = passwordRef.current?.value;
    const confirmPasswordInput = confirmPasswordRef.current?.value;
    const nameInput = nameRef.current?.value;
    let descriptionInput = descriptionRef.current?.value;
    const roleInput = roleRef.current?.value;

    // On ne démarre les vérifications de format et la création du user que si tous les champs required sont remplis
    if (
      emailInput &&
      passwordInput &&
      confirmPasswordInput &&
      nameInput       
    ) {
      // On définit un tableau de paires "clé/valeur" afin de pouvoir boucler dessus pour coller aux besoins des fonctions isValid() et errorInfo()
      const inputsKeyValue = [
        ['email', emailInput],
        ['password', passwordInput],
        ['name', nameInput],
        ['description', descriptionInput],
      ];

      if (passwordInput !== confirmPasswordInput) {
        setErrorMessage('Combinaison de mot de passe incorrecte');
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
        return;
      }

      // Avec la méthode .some(), dès que la condition est vraie, l'execution se fait et la boucle s'arrête
      const invalidInput = inputsKeyValue.some((keyValue) => {
        // On vérifie si l'input ne contient pas que des espaces
        if (keyValue[1] && keyValue[1].trim().length === 0) {
          setErrorMessage(`Format incorrect dans le champ ${keyValue[0]}`);
          return true;
        }
        // Si la fonction de validation de l'input return false, on affiche un message d'erreur
        if (keyValue[0] && keyValue[1] && !isValid(keyValue[0], keyValue[1])) {
          setErrorMessage(errorInfo(keyValue[0]));
          return true;
        }
        return false;
      });

      // Si invalidInput renvoie true, c'est à dire qu'une erreur a été captée, on arrête l'envoi du formulaire
      if (invalidInput) return;

      // Permet de retirer les endroits où il y a plus d'un espace entre 2 mots.
      if (descriptionInput) {
        console.log('description avant replace : ', descriptionInput);
        descriptionInput = descriptionInput.replace(/\s+/g, ' ');
        console.log('description avec 1 seul espace max : ', descriptionInput);
      }
      
      setErrorMessage('');

      let formData: any = {};
      if (descriptionInput) {
        formData = {
          email: emailInput,
          password: passwordInput,
          name: nameInput,
          description: descriptionInput,
          role: roleInput ?? 'user',
        };
      } else {
        formData = {
          email: emailInput,
          password: passwordInput,
          name: nameInput,
          role: roleInput ?? 'user',
        };
      }
      onFormSubmit(formData);
    } else {
      setErrorMessage('Tous les champs sont obligatoires');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel label='Email' className='mb-3'>
        <Form.Control
          type='email'
          placeholder='Email'
          ref={emailRef}
          required
        />
      </FloatingLabel>
      <FloatingLabel label='Mot de passe' className='mb-3'>
        <Form.Control
          type='password'
          placeholder='Mot de passe'
          ref={passwordRef}
          required
        />
        <Form.Text className='d-block'>
          Minimum 8 caractères, une majuscule, une minuscule, un chiffre et un
          caractère spécial
        </Form.Text>
      </FloatingLabel>
      <FloatingLabel label='Confirmation du mot de passe' className='mb-3'>
        <Form.Control
          type='password'
          placeholder='Confirmation du mot de passe'
          ref={confirmPasswordRef}
          required
        />
      </FloatingLabel>
      <FloatingLabel label='Pseudo' className='mb-3'>
        <Form.Control type='text' placeholder='Pseudo' ref={nameRef} required />
      </FloatingLabel>
      
      <FloatingLabel label='Description' className='mb-3'>
        <Form.Control
          as='textarea'
          placeholder='Description'
          ref={descriptionRef}
        />
      </FloatingLabel>
      
      {currentUser?.role === 'admin' && (
        <FloatingLabel label='Rôle'>
          <Form.Select ref={roleRef} required>
            <option>Sélectionner un rôle</option>
            <option value='user'>User</option>
            <option value='admin'>Admin</option>
          </Form.Select>
        </FloatingLabel>
      )}
      <Button type='submit' className='form-btn'>
        Valider
      </Button>
      {/* S'il y a un message d'erreur, on l'affiche dans une alerte */}
      {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
    </Form>
  );
};

export default UserForm;

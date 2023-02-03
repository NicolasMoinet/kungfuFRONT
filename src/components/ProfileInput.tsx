import React, { useEffect, useRef, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Alert, Form, ListGroup } from 'react-bootstrap';
import { faCheck, faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userProfileKeys } from '../pages/UserProfile';
import { UserType } from '../models/interface/User';
import { availablePictures } from '../models/interface/Pictures';
import useAxiosPrivate from '../api/useAxiosPrivate';
import './ProfileInput.css';
import { isValid } from '../models/form-validate/validation';
import { errorInfo } from '../models/form-validate/errorMessage';
import { useAuth } from '../context/AuthContext';

/**
 * ** Ce composant réutilisable permet de récupérer dynamiquement la clé (propriété) de l'utilisateur que l'on souhaite modifier.
 * ** Selon la valeur de la clé, on utilise un input ou un select ou le composant AddressInput
 * ** Selon la valeur de la clé, on enverra à l'API des informations différentes (l.112)
 */

interface ProfileInputProps {
  user: UserType;
  userKey: string;
}

// Le enum (vient de Typescript) Keys permet d'avoir accès à la clé du user sous format "clé" et non sous format "string"
// On pourra donc utilisé : [userKey as Keys] en tant que propriété du user pour récupérer sa valeur correspondante.
enum Keys {
  Email = 'email',
  PASSWORD = 'password',
  NAME = 'name',
  DESCRIPTION = 'description',
  
}

const ProfileInput = ({ user, userKey }: ProfileInputProps) => {
  // useState permettant de savoir si on est en train d'éditer la propriété pour savoir si on affiche l'élément input ou non
  const [isEditing, toggleIsEditing] = useState<boolean>(false);

  const [keyValue, setKeyValue] = useState<string>(user[userKey as Keys]);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorApiMessage, setErrorApiMessage] = useState<string[]>([]);

  const { setCurrentUser, currentUser } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = async () => {
    let inputValue = inputRef.current?.value;

    // On vérifie si l'input ne contient pas que des espaces
    if (inputValue && inputValue.trim().length === 0) {
      setErrorMessage('Format incorrect');
      return;
    }

    if (inputValue && !isValid(userKey, inputValue)) {
      setErrorMessage(errorInfo(userKey));
      return;
    }

    // Permet de retirer les endroits où il y a plus d'un espace entre 2 mots.
    if (userKey === 'description' && inputValue) {
      console.log('description avant replace : ', inputValue);
      inputValue = inputValue.replace(/\s+/g, ' ');
      console.log('description avec 1 seul espace max : ', inputValue);
    }
    const updatedData = { [userKey as Keys]: inputValue };

    console.log('data à envoyer pour update', updatedData);

    try {
      // On envoie en 2è argument du axios.patch, l'objet à update. Si c'est un succès, on repasse le useState d'édition à false pour retirer le champ input.
      const response: AxiosResponse = await axiosPrivate.patch(
        `/users/${user?.email}`,
        updatedData
      );
      console.log('ProfileInput - Update Success : ', response.data);
      toggleIsEditing(!isEditing);
      console.log('updateProfile Userrole :', user);
      currentUser?.role !== 'admin' && setCurrentUser(response.data);

      // Selon la clé, on récupère la valeur du champs modifié et on met à jour le state avec pour que la page de profil se mette à jour aussi.

      setErrorMessage('');
    } catch (error: any) {
      console.log('ProfileInput - Update Error : ', error);
      setErrorApiMessage(error.response.data.message);
    }
  };

  // Si on annule la modification, on retire l'input ainsi que l'éventuel message d'erreur qui a été affiché
  const handleCancel = () => {
    toggleIsEditing(!isEditing);
    setErrorMessage('');
    setErrorApiMessage([]);
  };

  // Si la clé correspond à description ou picture, l'input n'est pas required sinon il l'est
  const isRequired = userKey === 'description' ? false : true;

  return (
    <>
      <ListGroup horizontal className='account-group'>
        <ListGroup.Item className='account-type'>
          {userProfileKeys[userKey as Keys]}
        </ListGroup.Item>
        <ListGroup.Item className='account-value'>
          {/* Si on est pas en train d'éditer, on affiche simplement la valeur actuelle de la propriété dans une div ainsi que l'icône d'édition */}
          {!isEditing ? (
            <>
              {user && (
                <div className='my-auto text-truncate'>
                  {userKey !== 'password' ? keyValue : '********'}
                </div>
              )}
              <div>
                <FontAwesomeIcon
                  icon={faPencil}
                  className='icon text-success ps-2'
                  onClick={() => toggleIsEditing(!isEditing)}
                />
              </div>
            </>
          ) : (
            <>
              {user && (
                <div
                  className={
                    // Pour gérer le message d'info du format du password qui change le format du block
                    userKey === 'password' ? 'input-password' : 'w-100'
                  }
                >
                  <Form.Control
                    as={userKey === 'description' ? 'textarea' : 'input'} // si la clé correspond à la description, on met un textarea au lieu d'un input
                    ref={inputRef}
                    placeholder={
                      userKey !== 'password' ? keyValue : '********' // Pour l'instant pas de type='password' pour tester plus facilement le format du password
                    }
                    required={isRequired}
                  />
                  {userKey === 'password' && (
                    <Form.Text className='d-block'>
                      Minimum 8 caractères, une majuscule, une minuscule, un
                      chiffre et un caractère spécial
                    </Form.Text>
                  )}
                </div>
              )}
              <FontAwesomeIcon
                icon={faCheck}
                className='icon text-primary ps-3'
                onClick={handleSubmit}
              />

              <FontAwesomeIcon
                icon={faXmark}
                className='icon text-danger ps-3'
                onClick={handleCancel}
              />
            </>
          )}
        </ListGroup.Item>
      </ListGroup>

      {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
      {errorApiMessage &&
        errorApiMessage.map((error, i) => (
          <Alert key={i} variant='danger'>
            {error}
          </Alert>
        ))}
    </>
  );
};

export default React.memo(ProfileInput);

import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  Accordion,
  Alert,
  Card,
  Container,
  FloatingLabel,
  FormControl,
  Modal,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { userProfileKeys } from './UserProfile';
import UserForm from '../components/UserForm';
import EventForm from '../components/EventForm';
import EventModal from '../components/EventModal';
import ProfileInput from '../components/ProfileInput';

import { UserType } from '../models/interface/User';
import { EventType } from '../models/interface/Event';
import { useAuth } from '../context/AuthContext';
import './Admin.css';
import { useToast } from '../context/ToastContext';
import useAxiosPrivate from '../api/useAxiosPrivate';

enum PropKeys {
  TYPE = 'type',
  NAME = 'name',
}

const Admin = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [events, setEvents] = useState<EventType[]>([]);

  // Permet d'afficher ou cacher la modal
  const [show, setShow] = useState(false);

  // Permet de passer le user ou event correspondant vers la modal lorsque l'on clique sur un des éléments dans la liste
  const [user, setUser] = useState<UserType>();
  const [event, setEvent] = useState<EventType>();

  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [deleteUserMessage, setDeleteUserMessage] = useState('');
  const [errorApiMessage, setErrorApiMessage] = useState<string[]>([]);

  const { currentUser } = useAuth();
  const { handleToast } = useToast();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response: AxiosResponse<UserType[]> = await axiosPrivate.get(
          `/users`
        );
        const formatedUsers = response.data.map((user) => ({
          ...user,
        }));
        setUsers(formatedUsers);
      } catch (error) {
        console.log('Admin Interface - Get Users - Error : ', error);
      }
    };
    getUsers();

    const getEvents = async () => {
      try {
        const response: AxiosResponse<EventType[]> = await axios.get(
          `http://localhost:8080/api/events`
        );

        // activity et level étant des objets, on doit importer leur name dans des nouvelles propriétés qui seront utilisées pour l'update d'un event dans EventUpdate.tsx
        const formatedEvents = response.data.map((event) => ({
          ...event,
        }));
        setEvents(formatedEvents);
      } catch (error) {
        console.log('Admin Interface - Get Events - Error : ', error);
      }
    };
    getEvents();
  }, []);
  // Cette méthode permet de récupérer un tableau avec la liste des clés utiles de User sous forme de string qui seront utilisées pour accéder aux valeurs des propriétés du user récupéré dans le useState
  const userKeys = Object.keys(userProfileKeys);
  // Les 3 fonctions suivantes permettent de gérer l'ouverture et fermeture de la modal ainsi que de faire passer les infos du user/event sélectionné vers celle-ci
  const handleUserDetails = (user: UserType) => {
    console.log('modal user : ', user);
    setShow(true);
    setUser(user);
  };

  const handleEventDetails = (event: EventType) => {
    setShow(true);
    setEvent(event);
  };

  const handleClose = () => {
    setUser(undefined);
    setShow(false);
  };

  const handleUserForm = async (formUserData: UserType) => {
    console.log('Admin Interface - Data User : ', formUserData);
    setErrorApiMessage([]);
    try {
      const response: AxiosResponse<UserType> = await axios.post(
        'http://localhost:8080/api/auth/register',
        formUserData
      );
      console.log(
        'Admin Interface - HandleUserForm - Response : ',
        response.data
      );
      handleToast({
        message: 'Utilisateur créé',
        color: 'success',
        delay: 3000,
      });

      const newUser = {
        ...response.data,
    
      };

      // On met à jour le state des users pour lancer un rerender du dashboard et avoir la liste rafraichie des users
      setUsers((prev) => [...prev, newUser]);
    } catch (error: any) {
      console.log('Admin Interface - HandleUserForm - Error : ', error);
      setErrorMessage(error.response.data.message);
    }
  };

  const handleEventForm = async (formEventData: EventType) => {
    console.log('Admin Interface - Data Event : ', formEventData);
    setErrorApiMessage([]);
    try {
      const response: AxiosResponse<EventType> = await axiosPrivate.post(
        '/events',
        formEventData
      );
      console.log(
        'Admin Interface - HandleEventForm - Response : ',
        response.data
      );
      handleToast({
        message: 'Evènement créé !',
        color: 'success',
        delay: 3000,
      });

      // On met à jour le state des events pour lancer un rerender du dashboard et avoir la liste rafraichie des events
      setEvents((prev) => [...prev, response.data]);
    } catch (error: any) {
      console.log('Admin Interface - HandleEventForm - Error : ', error);
      setErrorApiMessage(error.response.data.message);
    }
  };

  const handleDeleteUser = async (user: UserType) => {
    const updatedUsers = users.filter(
      (userFromList) => userFromList.id !== user.id
    );
    try {
      const response: AxiosResponse = await axiosPrivate.delete(
        `/users/${user.email}`
      );
      console.log('Admin Interface - Delete User - Response: ', response.data);
      // setDeleteUserMessage('Utilisateur supprimé');
      handleToast({
        message: 'Utilisateur supprimé !',
        color: 'warning',
        delay: 3000,
      });

      setTimeout(() => {
        setDeleteUserMessage('');
        setUser(undefined);

        // On met à jour le state des users pour lancer un rerender du dashboard et avoir la liste rafraichie des users
        setUsers(updatedUsers);
      }, 3000);
    } catch (error) {
      console.log('Admin Interface - Delete User - Error : ', error);
    }
  };

  const handleDeleteEvent = (deletedEvent: EventType) => {
    const remainingEvents = events.filter(
      (event) => event.id !== deletedEvent.id
    );

    // On met à jour le state des events pour lancer un rerender du dashboard et avoir la liste rafraichie des events
    setEvents(remainingEvents);
  };
  const handleEventUserUnsubscribe = (eventModified: EventType) => {
    console.log('eventmodified : ', eventModified);
  };

  return (
    <Container>
      <h2 className='admin-title'>Bonjour {currentUser?.name}</h2>
      <Card className='admin-dashboard'>
        <Card.Header>
          <Card.Title as={'h3'} className='admin-dashboard-title'>
            Dashboard
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text className='admin-dashboard-stats'>
            Nombre d'utilisateurs inscrits : {users.length}
          </Card.Text>
          <Card.Text className='admin-dashboard-stats'>
            Nombre d'évènements créés inscrits : {events.length}
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <Card.Title as={'h3'} className='admin-dashboard-title'>
            Manage
          </Card.Title>
        </Card.Header>
        <Card.Body className='p-0'>
          <Accordion>
            <Accordion.Item eventKey='0'>
              <Accordion.Header as='h4'>
                Liste des utilisateurs
              </Accordion.Header>
              <Accordion.Body>
                {users.map((user) => (
                  <div key={user.id} className='admin-list-infos'>
                    <div>{user.email}</div>
                    <FontAwesomeIcon
                      icon={faEye}
                      className='admin-list-icon'
                      onClick={() => handleUserDetails(user)}
                    />
                  </div>
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='1'>
              <Accordion.Header as='h4'>
                Ajouter un utilisateur
              </Accordion.Header>
              <Accordion.Body>
                <h5 className='account-header mb-3'>Informations générales</h5>
                <UserForm onFormSubmit={handleUserForm} />
                {errorMessage &&
                  errorMessage.map((error, i) => (
                    <Alert key={i} variant='danger'>
                      {error}
                    </Alert>
                  ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='2'>
              <Accordion.Header as='h4'>Liste des évènements</Accordion.Header>
              <Accordion.Body>
                {events.map((event) => (
                  <div key={event.id} className='admin-list-infos'>
                    <div>{event.title}</div>
                    <FontAwesomeIcon
                      icon={faEye}
                      className='admin-list-icon'
                      onClick={() => handleEventDetails(event)}
                    />
                  </div>
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='3'>
              <Accordion.Header as='h4'>Ajouter un évènement</Accordion.Header>
              <Accordion.Body>
                <EventForm onFormSubmit={handleEventForm} />
                {errorApiMessage &&
                  errorApiMessage.map((error, i) => (
                    <Alert key={i} variant='danger'>
                      {error}
                    </Alert>
                  ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>
      {user && (
        <Modal
          show={show}
          onHide={handleClose}
          centered
          dialogClassName='modal-90w'
        >
          <Modal.Header closeButton>
            <div className='modal-header-infos'>
              <Modal.Title>
                Infos {user ? 'Utilisateur' : 'Evènement'}
              </Modal.Title>
              <FontAwesomeIcon
                icon={faTrashCan}
                className='delete-icon'
                color='red'
                onClick={() => handleDeleteUser(user)}
              />
            </div>
          </Modal.Header>
          <Modal.Body>
            {user &&
              userKeys.map((userKey, i) => (
                // On envoie à l'enfant ProfileInput les props : user récupéré + la clé sur laquelle on est en train de loop avec map
                <ProfileInput key={i} user={user} userKey={userKey} />
              ))}
            
          </Modal.Body>
          {deleteUserMessage && (
            <Alert variant='warning'>{deleteUserMessage}</Alert>
          )}
        </Modal>
      )}
      {event && (
        <EventModal
          event={event}
          setEvent={setEvent}
          show={show}
          setShow={setShow}
          onEventDeleteByAdmin={handleDeleteEvent}
          // onEventUserUnsubscribe={handleEventUserUnsubscribe}
        />
      )}
    </Container>
  );
};

export default Admin;

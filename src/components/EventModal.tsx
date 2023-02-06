import React, { useState } from 'react';
import { AxiosResponse } from 'axios';
import { Alert, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
//import EventUpdate from './EventUpdate';
import { formatDate } from '../models/formats/date';
import { EventType } from '../models/interface/Event';
import { useAuth } from '../context/AuthContext';
import useAxiosPrivate from '../api/useAxiosPrivate';
import { useEvents } from '../context/EventsContext';
import './EventModal.css';

// Toutes les props sont passées par le parent ThumbnailEvent
interface EventModalProps {
  // Contient les infos de l'event à afficher dans la modal
  event: EventType | undefined;

  // Event setter, permet de mettre à jour le state de ThumbnailEvent en cas d'inscription, désinscription, annulation ou modification d'un event pour rerender la liste des vignettes (est ce le meilleur moyen de le faire ?)
  setEvent: React.Dispatch<React.SetStateAction<EventType | undefined>>;

  // Récupère la valeur true affichant la modal si un user a cliqué sur "+ de détails"
  show: boolean;

  // Setter du state qui permet de renvoyer l'info au parent que la modal a été fermée
  setShow: React.Dispatch<React.SetStateAction<boolean>>;

  // Fait remonter au parent (Admin.tsx), l'event que l'admin a supprimé pour mettre à jour la liste d'events
  onEventDeleteByAdmin?: { (deletedEvent: EventType): void };
  //fait remonter au parent (userInterface), l'event dont l'user s'est desinscrit pour mettre a jour la liste d'events
  // onEventUserUnsubscribe: { (eventModified: EventType): void };
}

// Les associations entre les keys de EventType et les propriétés en français utilisées sur la page d'update de l'event.
export const eventKeys = {
  title: 'Titre',
  date: 'Date',
  time: 'Time',
  address: 'Address',
  postalCode: 'PostalCode',
  city: 'City',
  description: 'Description',
};

const EventModal = ({
  event,
  setEvent,
  show,
  setShow,
  onEventDeleteByAdmin,
}: EventModalProps) => {
  // state pour savoir si l'on est en train d'update l'event ou non
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // On récupère, depuis le context, le user connecté pour savoir s'il est un participant de l'event ou s'il l'a organisé ou si c'est un admin
  const { currentUser } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { events, setEvents } = useEvents();

  const eventDateTimeMS = Date.parse(`${event?.date} ${event?.time}`);
  const isEventPassed = eventDateTimeMS < Date.now();

  // Permet de vérifier si le user est un participant de l'event pour changer le type de bouton de la modal
  const isParticipant = () => {
    const isUserParticipant = event?.participants.some(
      (participant) => participant.name === currentUser?.name
    );
    console.log('Modal - User est-il un participant : ', isUserParticipant);
    return isUserParticipant;
  };

  // Définition du composant popover qui va s'afficher quand on essaie de contacter un organisateur
  const popover = (
    <Popover>
      <Popover.Body>
        Cette fonctionnalité n'est pas encore développée !
      </Popover.Body>
    </Popover>
  );

  // Cette méthode permet de récupérer un tableau avec la liste des clés utiles de Event sous forme de string qui seront utilisées pour accéder aux valeurs des propriétés de l'event récupéré dans le useState
  const eventKeysList = Object.keys(eventKeys);

  // Logique pour inscrire un user à un event
  const handleSubscribe = async () => {
    console.log("Inscription Event - User qui va s'inscrire : ", currentUser);

    // On ajoute le user qui s'inscrit à la liste des participants
    if (event && currentUser) {
      const updatedParticipants = [...event.participants, currentUser];
      console.log(
        'Inscription Event - liste participants mise à jour : ',
        updatedParticipants
      );

      // On met à jour l'event avec la nouvelle liste de participants pour le setEvent qui forcera le rerender de notre liste d'events
      const updatedEvent: EventType = {
        ...event,
        participants: updatedParticipants,
      };
      let updatedSuscribeEvents: EventType[] = [...events];

      try {
        const response: AxiosResponse = await axiosPrivate.patch(
          `/events/${event.id}`,
          { participants: updatedParticipants }
        );
        console.log('Inscription Event - Response : ', response.data);
        setEvent(updatedEvent);

        //on met a jour la liste d'evenement du contexte avec l'evenement modifié
        updatedSuscribeEvents = updatedSuscribeEvents.filter(
          (event) => event.id !== updatedEvent.id
        );
        updatedSuscribeEvents = [...updatedSuscribeEvents, updatedEvent];
        setEvents(updatedSuscribeEvents);
        console.log(
          'eventmodal suscribe updated event:',
          updatedSuscribeEvents
        );

        setSuccessMessage('Participation validée. Bravo !');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } catch (error) {
        console.log('Inscription Event - Error : ', error);
        setErrorMessage(
          'Une erreur est survenue. Veuillez réessayer plus tard.'
        );
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    }
  };

  // Logique pour se déinscrire d'un évènement
  const handleUnsubscribe = async () => {
    console.log(
      'Déinscription Event - User qui va se désinscrire : ',
      currentUser
    );

    // On met à jour la liste de participants en retirant le user qui vient de se désinscrire
    if (event) {
      console.log(
        'Déinscription Event - liste participants avant mise à jour : ',
        event.participants
      );
      const updatedParticipants = event.participants.filter(
        (participant) => participant.id !== currentUser?.id
      );
      console.log(
        'Déinscription Event - liste participants mise à jour : ',
        updatedParticipants
      );

      // On met à jour l'event avec la nouvelle liste de participants pour le setEvent qui forcera le rerender de notre liste d'events
      const updatedEvent: EventType = {
        ...event,
        participants: updatedParticipants,
      };

      let updatedUnsuscribeEvents: EventType[] = [...events];

      try {
        const response: AxiosResponse = await axiosPrivate.patch(
          `/events/${event.id}`,
          { participants: updatedParticipants }
        );
        console.log('Déinscription Event - Response : ', response.data);
        setEvent(updatedEvent);
        setSuccessMessage('Participation annulée. A bientôt !');

        //on met a jour la liste d'evenement du contexte avec l'evenement modifié
        updatedUnsuscribeEvents = updatedUnsuscribeEvents.filter(
          (event) => event.id !== updatedEvent.id
        );
        updatedUnsuscribeEvents = [...updatedUnsuscribeEvents, updatedEvent];
        setEvents(updatedUnsuscribeEvents);
        console.log(
          'eventmodal suscribe updated event:',
          updatedUnsuscribeEvents
        );
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } catch (error) {
        console.log('Déinscription Event - Error : ', error);
        setErrorMessage(
          'Une erreur est survenue. Veuillez réessayer plus tard.'
        );
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    }
  };

  // Logique pour annuler un évènement
  const handleCancelEvent = async () => {
    if (event) {
      try {
        const response: AxiosResponse = await axiosPrivate.delete(
          `/events/${event.id}`
        );
        console.log('Annulation Event - Response : ', response.data);
        setSuccessMessage(
          'Evènement annulé. Redirection automatique. A bientôt !'
        );
        onEventDeleteByAdmin && onEventDeleteByAdmin(event);
        const remainingEvents = events.filter(
          (eventDeLaList) => eventDeLaList.id !== event.id
        );

        // On met à jour le state des events pour lancer un rerender du dashboard et avoir la liste rafraichie des events
        setEvents(remainingEvents);
        setTimeout(() => {
          setEvent(undefined);
          setSuccessMessage('');
        }, 3000);
      } catch (error) {
        console.log('Annulation Event - Error : ', error);
        setErrorMessage(
          'Une erreur est survenue. Veuillez réessayer plus tard.'
        );
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    }
  };

  return (
    <>
      {event && (
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName='modal-90w'
          centered
          size='lg'
        >
          <Modal.Header closeButton={!isEditing ? true : false}>
            {!isEditing ? (
              <>
                <Modal.Title as='h4' className='modal-title'>
                  {event.title}
                </Modal.Title>
                {(currentUser?.id === event.organisateur.id ||
                  currentUser?.role === 'admin') && (
                  <FontAwesomeIcon
                    icon={faPencil}
                    color='green'
                    className='event-edit-icon'
                    onClick={() => setIsEditing(true)}
                  />
                )}
                {currentUser?.role === 'admin' && (
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className='delete-icon'
                    color='red'
                    onClick={handleCancelEvent}
                  />
                )}
              </>
            ) : (
              <Modal.Title as='h4' className='modal-title'>
                Edition en cours
              </Modal.Title>
            )}
          </Modal.Header>
          {!isEditing ? (
            <>
              <div className='organisateur-block'>
                <div className='organisateur-infos'>
                  <p>Organisateur : </p>
                  <p className='organisateur-name'>
                    {event?.organisateur.name}
                  </p>
                </div>
              </div>
              <Modal.Body>
                <div className='event-content'>
                  <div className='event-details'>
                    <div className='event-where-when'>
                      <p className=''>{formatDate(event.date)}</p>
                      <p className=''>{event?.time}</p>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <div className='event-description'>{event.description}</div>
            </>
          ) : (
            <Modal.Body></Modal.Body>
          )}
          <Modal.Footer
            className={
              isParticipant() ? 'modal-footer-participant' : 'modal-footer'
            }
          >
            {/* Suivant si le user est l'organisateur, un participant ou aucun des 2, on change le button (qui aura une fonction différente suivant les cas) */}
            {currentUser &&
            (currentUser.id === event.organisateur.id ||
              currentUser.role === 'admin') ? (
              !isEditing ? (
                <Button onClick={handleCancelEvent} className='modal-btn '>
                  Annuler l'évènement
                </Button>
              ) : (
                <Button
                  onClick={() => setIsEditing(false)}
                  className='modal-btn '
                >
                  Retour à l'event
                </Button>
              )
            ) : isParticipant() ? (
              <Button
                onClick={handleUnsubscribe}
                className='modal-btn btn-participant'
              >
                Je me désinscris
              </Button>
            ) : (
              <Button onClick={handleSubscribe} className='modal-btn'>Je m'inscris</Button>
            )}
            {isParticipant() && (
              <OverlayTrigger trigger='click' placement='top' overlay={popover}>
                <Button className='modal-btn btn-participant'>
                  Contacter l'organisateur
                </Button>
              </OverlayTrigger>
            )}
            <div className='event-message'>
              {successMessage && (
                <Alert className='event-message-success'>
                  {successMessage}
                </Alert>
              )}
              {errorMessage && (
                <Alert variant='danger' className='fw-bold'>
                  {errorMessage}
                </Alert>
              )}
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default EventModal;

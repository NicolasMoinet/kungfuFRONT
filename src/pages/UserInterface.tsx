import { Link } from 'react-router-dom';
import { faMarker } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBarLoginIn from '../components/NavBarLoginIn';
import ThumbnailEvent from '../components/ThumbnailEvent';
import './UserInterface.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { EventType } from '../models/interface/Event';
import Image from 'react-bootstrap/Image';
import { useEvents } from '../context/EventsContext';
import useAxiosPrivate from '../api/useAxiosPrivate';
import AOS from 'aos';
import 'aos/dist/aos.css';
//on déclare les variables dont on va avoir besoin pour les initialiser
//
let eventsListUserParticipant: EventType[] = [];
let nombreEventInscritAVenir: Number = 0;
let nombreEventPast: Number = 0;
let nombreNextEventOrganise: Number = 0;

const UserInterface = () => {
  //on importe nos 2 contexts. pour avoir le current user et le context event
  const { currentUser } = useAuth();
  const { events } = useEvents();
  const axiosPrivate = useAxiosPrivate();

  //
  const [listEvents, setListEvents] = useState<EventType[]>([]);

  useEffect(() => {
    axiosPrivate
      .get(
        `http://localhost:8080/api/users/events/participant/${currentUser?.id}`
      )
      .then((response) => {
        setListEvents(response.data);
        eventsListUserParticipant = response.data;
        console.log('UI event participant', eventsListUserParticipant);
      });
  }, [events]);
  useEffect(() => {
    AOS.init({
      duration: 3000,
      offset: 50,
      easing: 'ease-in-out',
      // delay: 200,
      once: false,
    });
  }, []);

  const filterNextEventsParticipant = () => {
    let resultUserNextEvent: EventType[] = [...listEvents];
    console.log('user interfact reslut nex event :', resultUserNextEvent);
    resultUserNextEvent = resultUserNextEvent.filter((event) => {
      let eventDateHourMS = Date.parse(`${event.date} ${event.time}`);
      return Date.now() < eventDateHourMS;
    });
    nombreEventInscritAVenir = resultUserNextEvent.length;
    console.log('nombre event inscrit a venir', nombreEventInscritAVenir);
    console.log('UI next event inscrit', resultUserNextEvent);
    return resultUserNextEvent;
  };

  const filterPastEventParticipant = () => {
    let resultUserPastEvent: EventType[] = [...eventsListUserParticipant];
    resultUserPastEvent = resultUserPastEvent.filter((event) => {
      let eventDateHourMS = Date.parse(`${event.date} ${event.time}`);

      return Date.now() > eventDateHourMS;
    });
    nombreEventPast = resultUserPastEvent.length;

    console.log('UI nombre event past', nombreEventPast);

    return resultUserPastEvent;
  };

  const filterEventOrganiseNext = () => {
    let resultOrganisateurNextEvent: EventType[] = [...events];
    resultOrganisateurNextEvent = resultOrganisateurNextEvent.filter(
      (event) => {
        let eventDateHourMS = Date.parse(`${event.date} ${event.time}`);
        // le .some va comparer dabs notre tableau de participant les id pour voir si le current user.id y est ou pas. si oui il va répondre false
        const isOrganisateur = event.organisateur.id === currentUser?.id;

        return (
          currentUser &&
          Date.now() < eventDateHourMS &&
          //doit etre organisatzu
          isOrganisateur
        );
      }
    );
    console.log('ui event list', resultOrganisateurNextEvent);
    nombreNextEventOrganise = resultOrganisateurNextEvent.length;
    console.log('nombre event proche de chez vous', nombreNextEventOrganise);
    return resultOrganisateurNextEvent;
  };
  // reprendre la base du tableau filtré!
  //trouver la date de l'evenement en string
  // formaté en date la string ( en ms)
  // comparer la date de jour a celle de l'event (en ms)

  //doit etre plus petit
  // mettre dans le carroussel le nom de la const

  return (
    <div>
      <div className='navbar-login-in'>
        <NavBarLoginIn />
      </div>
      <section className='bandeau-user'>
        <div>
          <div
            className='bonjour-user'
            data-aos='fade-up'
            data-aos-duration='1000'
            // data-aos-delay='10'
          >
            Bonjour {currentUser?.name},
            <p>
              {nombreEventInscritAVenir < 1
                ? `Vous n'êtes actuellement inscrit à aucun événement, n'hesitez pas !  `
                : `Vous êtes actuellement inscrit à ${nombreEventInscritAVenir} évènement(s) `}

              <Link to='/user/profile'>
                <div className='button-UI-edit-profil'>
                  <FontAwesomeIcon
                    icon={faMarker}
                    color={'white'}
                    className='iconNB '
                  />
                </div>
              </Link>
            </p>
          </div>
        </div>
      </section>
      <div className='imageconteneur'>
        <img
          className='imageR'
          src='/assets/street.jpg'
          alt='calligraphie'
          data-aos='zoom-out'
          data-aos-duration='60000'
        ></img>
      </div>
      <section className='caroussel'>
        <div className='ProcheDeChezVous'> Évènement à venir :</div>

        {nombreEventInscritAVenir > 0 && (
          <div className='evenementavenir'> Prochains évènements :</div>
        )}
        <ThumbnailEvent events={filterNextEventsParticipant()} />

        {nombreNextEventOrganise > 0 && (
          <div className='ProchainEvenementOrganisé'>
            Prochains évènements organisés :
          </div>
        )}
        <ThumbnailEvent events={filterEventOrganiseNext()} />

        {nombreEventPast > 0 && (
          <div className='EvenementsPassés'>Mes évènements passés :</div>
        )}
        {<ThumbnailEvent events={filterPastEventParticipant()} />}
      </section>
    </div>
  );
};

export default UserInterface;

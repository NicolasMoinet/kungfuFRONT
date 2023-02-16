import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useLocation, useNavigate } from 'react-router-dom';
import EventModal from './EventModal';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EventType } from '../models/interface/Event';
import { formatDate } from '../models/formats/date';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ThumbnailEvent.css';

type ThumbnailEventProps = {
  // on récupere depuis le parent la liste d'evenements qui sera eventuellement filtrée
  events: EventType[];
  // pour savoir si on cherche à récupérer les évènements organisés ou participés
  eventType?: 'organisateur' | 'participant';
};

const ThumbnailEvent = ({ eventType, events }: ThumbnailEventProps) => {
  const [show, setShow] = useState(false);
  const [event, setEvent] = useState<EventType>();

  // useLocation permet de savoir sur quel url on se trouve
  // Cela nous permettra de changer l'action du bouton selon si on se trouve sur la landing page ou sur une autre
  const location = useLocation();
  // useNavigate permet de nous rediriger vers une autre page
  const navigate = useNavigate();

  // fonction qui gère le click dans la vignette d'event selon la page où l'on se trouve
  const handleClick = (event: EventType) => {
    console.log('Thumbnail clicked - location : ', location);
    console.log('Thumbnail clicked - event : ', event);
    if (location.pathname === '/') {
      navigate('/inscription');
    } else {
      setShow(true);
      // l'activité et level fetch étant des objets, on doit traiter séparemment leurs ajouts dans le state pour matcher avec leurs props dans le composant EventUpdate
      setEvent({
        ...event,
      });
    }
  };

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        // initialSlide={2}
        navigation
        pagination={{ clickable: true }}
        speed={1100}
        // test loop false si moins de 3 slides dans state events
        loop
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1200: {
            initialSlide: 1,
            centeredSlides: true,
            slidesPerView: 3,
          },
        }}
      >
        {events.map((event, i) => (
          <SwiperSlide key={event.id} className='swiper-thumbnail'>
            {({ isActive, isPrev, isNext }) =>
              (isActive || isNext || isPrev) && (
                <Card className='event-thumbnail'>
                  <div className='event-thumbnail-avatar'>
                    {event.picture ? (
                      <Image
                        src={`http://localhost:8080/api/events/${event?.picture}`} // Affiche la photo de l'orga si elle existe
                        alt='panda avatar'
                        thumbnail
                        // roundedCircle
                      />
                    ) : (
                      <p>Pas d'image</p>
                    )}
                  </div>
                  <div className='event-thumbnail-body'>
                    <div className='event-thumbnail-top-content'>
                      <div className='event-thumbnail-block event-thumbnail-header'>
                        <Card.Title className='event-thumbnail-infos event-thumbnail-title'>
                          {event?.title}
                        </Card.Title>
                      </div>
                      <div className='event-thumbnail-block'>
                        <Card.Text className='event-thumbnail-infos'>
                          Date : {formatDate(event.date)}
                        </Card.Text>
                        <Card.Text className='event-thumbnail-infos event-thumbnail-time'>
                          Heure : {event.time}
                        </Card.Text>
                      </div>
                    </div>
                    {/* <Button0 /> */}
                    <Button
                      className='custom-btn btn-9'
                      onClick={() => {
                        handleClick(event);
                      }}
                    >
                      Détails
                    </Button>
                  </div>
                </Card>
              )
            }
          </SwiperSlide>
        ))}
      </Swiper>
      <EventModal
        event={event}
        setEvent={setEvent}
        show={show}
        setShow={setShow}
      />
    </>
  );
};

export default ThumbnailEvent;

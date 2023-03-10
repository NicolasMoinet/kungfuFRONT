import React, { useEffect, useState, FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from 'react-bootstrap';

import { useToast } from '../context/ToastContext';
import useAxiosPrivate from '../api/useAxiosPrivate';
import './Organiser.css';
import { isValid } from '../models/form-validate/validation';
import { errorInfo } from '../models/form-validate/errorMessage';
import { useEvents } from '../context/EventsContext';
import Button1 from '../components/Button1';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Organiser = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [errorApiMessage, setErrorApiMessage] = useState<string[]>([]);

  const axiosPrivate = useAxiosPrivate();
  const [pictures, setPictures] = useState<File>();
  const { handleToast } = useToast();
  const { events, setEvents } = useEvents();

  const title = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);
  const time = useRef<HTMLInputElement>(null);
  const descrip = useRef<HTMLTextAreaElement>(null);
  const address = useRef<HTMLInputElement>(null);
  const postalCode = useRef<HTMLInputElement>(null);
  const city = useRef<HTMLInputElement>(null);

  const pictureUploader = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = event.target.files?.[0];
    if (!files) {
      return;
    }
    setPictures(files);
  };
  const handleSubmitForm = (e: FormEvent) => {
    //quand on click sur le button pour envoyer les données
    e.preventDefault();
    setErrorApiMessage([]);

    const titleInput = title.current?.value;
    const dateInput = date.current?.value;
    const timeInput = time.current?.value;
    const addressInput = address.current?.value;
    const postalCodeInput = postalCode.current?.value;
    const cityInput = city.current?.value;
    let descripInput = descrip.current?.value;

    if (
      titleInput &&
      dateInput &&
      timeInput &&
      addressInput &&
      postalCode &&
      cityInput &&
      descripInput
    ) {
      if (titleInput && !isValid('title', titleInput)) {
        setErrorMsg(errorInfo('title'));
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
        return;
      }

      let dateHourInput = Date.parse(`${dateInput} ${timeInput}`);
      let dateDuJour = Date.now();

      if (dateHourInput < dateDuJour) {
        setErrorMsg(
          'Cette date est déjà passée. Nous vous conseillons de prévoir votre évènement au moins 24h en avance.'
        );
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
        return;
      }

      if (descripInput && !isValid('description', descripInput)) {
        setErrorMsg(errorInfo('description'));
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
        return;
      }

      // Permet de retirer les endroits où il y a plus d'un espace entre 2 mots.
      if (descripInput) {
        console.log('description avant replace : ', descripInput);
        descripInput = descripInput.replace(/\s+/g, ' ');
        console.log('description avec 1 seul espace max : ', descripInput);
      }

      // let userInsert = {
      //   title: titleInput,
      //   date: dateInput,
      //   time: timeInput,
      //   address: addressInput,
      //   postalCode: postalCodeInput,
      //   city: cityInput,
      //   description: descripInput,
      // };
      // console.log(userInsert);
      const formData = new FormData();

      formData.append('title', titleInput);
      formData.append('date', dateInput);
      formData.append('description', descripInput);
      formData.append('picture', pictures || '');
      formData.append('time', timeInput);
      formData.append('address', addressInput);
      formData.append('postalCode', postalCodeInput || '');
      formData.append('city', cityInput);

      axiosPrivate({
        method: 'post',
        url: '/events',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((response) => {
          let eventData = response.data;
          console.log('organiser, eventdata evenement crée : ', eventData);

          let updatedEventsList = [...events];

          if (response.status === 201) {
            // On rajoute la propriété participants à l'évènement créé récupéré dans la réponse
            eventData = { ...eventData, participants: [] };
            // On rajoute cet évènement à notre liste d'évènements et on met à jour le state du context avec
            updatedEventsList = [...updatedEventsList, eventData];
            setEvents(updatedEventsList);
            setErrorMsg('');
            handleToast({
              message: 'Votre évènement a bien été créé !',
              color: 'success',
              delay: 5000,
            });
            navigate('/recherche');
          }
        })

        .catch((error) => {
          console.log('Organiser - HandleSubmit Error : ', error);
          if (error.response.status === 401) {
            localStorage.removeItem('accessToken');
            navigate('/user/profile');
            return;
          }
          setErrorApiMessage(error.response.data.message);
        });
    } else {
      setErrorMsg('Tous les champs sont obligatoires');
      setTimeout(() => {
        setErrorMsg('');
      }, 5000);
    }
  };
  useEffect(() => {
    AOS.init({
      duration: 3000,
      offset: 50,
      easing: 'ease-in-out',
      // delay: 200,
      once: false,
    });
  }, []);

  return (
    <>
      <div className='bandeauTitreO'>
        <div className='titreee' data-aos='fade-right' data-aos-duration='1000'>
        <h1>Créer votre évènement </h1>
        </div>
      </div>
      <div className='imageconteneur'>
        <img
          className='imageR'
          src='assets/calligraphie.jpg'
          alt='calligraphie'
          data-aos='zoom-out'
          data-aos-duration='60000'
        ></img>
      </div>
      <Container className='container'>
        <Row>
          <Col>
            <form onSubmit={handleSubmitForm}>
              <FloatingLabel label='Titre évènement' className='mb-3'>
                {' '}
                <Form.Control
                  required
                  ref={title}
                  placeholder='Titre évènement'
                />
              </FloatingLabel>

              <Row className='py-3'>
                <Form.Group as={Col}>
                  <FloatingLabel label='Date' className='mb-3'>
                    <Form.Control type='date' ref={date} required />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group as={Col}>
                  <FloatingLabel label='Heure' className='mb-3'>
                    <Form.Control type='time' ref={time} required />
                  </FloatingLabel>
                </Form.Group>
              </Row>
              <FloatingLabel label='Adresse' className='mb-3'>
                {' '}
                <Form.Control required ref={address} placeholder='Address' />
              </FloatingLabel>
              <Row className='py-3'>
                <Form.Group as={Col}>
                  <FloatingLabel label='Code postal' className='mb-3'>
                    {' '}
                    <Form.Control type='text' ref={postalCode} required />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group as={Col}>
                  <FloatingLabel label='Ville' className='mb-3'>
                    <Form.Control type='text' ref={city} required />
                  </FloatingLabel>
                </Form.Group>
              </Row>
              <Form.Group
                className='py-3'
                controlId='exampleForm.ControlTextarea1'
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as='textarea'
                  type='text'
                  rows={4}
                  ref={descrip}
                  required
                />
              </Form.Group>
              {/* <Button className='button-signup my-3' type='submit'>
                Créer
              </Button> */}
              <div>
                <input type='file' onChange={pictureUploader} />
              </div>
              <Button1 />
              {errorMsg && <Alert variant='danger'>{errorMsg}</Alert>}
              {errorApiMessage &&
                errorApiMessage.map((error, i) => (
                  <Alert key={i} variant='danger'>
                    {error}
                  </Alert>
                ))}
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Organiser;

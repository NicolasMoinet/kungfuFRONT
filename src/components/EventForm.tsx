import React, { useEffect, useRef, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Alert, Button, FloatingLabel, Form } from 'react-bootstrap';
import { EventType } from '../models/interface/Event';

import { isValid } from '../models/form-validate/validation';
import { errorInfo } from '../models/form-validate/errorMessage';
import './EventForm.css';

interface EventFormProps {
  onFormSubmit: { (formData: EventType): void };
}

const EventForm = ({ onFormSubmit }: EventFormProps) => {
  
  const [errorMessage, setErrorMessage] = useState<string>('');

  

  const titleRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

 

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const titleInput = titleRef.current?.value;
    const dateInput = dateRef.current?.value;
    const timeInput = timeRef.current?.value;
    
    let descriptionInput = descriptionRef.current?.value;

    // Si tous les champs ne sont pas remplis, on renvoie un message d'erreur (dans le else) et le formulaire n'est pas envoyé.
    if (
      titleInput &&
      dateInput &&
      timeInput &&
      descriptionInput
    ) {
      // On définit un tableau de paires "clé/valeur" afin de pouvoir boucler dessus pour coller aux besoins des fonctions isValid() et errorInfo()
      const inputsKeyValue = [
        ['title', titleInput],
        ['date', dateInput],
        ['description', descriptionInput],
      ];

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

      // Si la date formatée choisie pour l'event est antérieure à la date d'aujourd'hui, on renvoie une erreur
      let eventDateHourMS = Date.parse(`${dateInput} ${timeInput}`);
      if (eventDateHourMS - Date.now() < 0) {
        setErrorMessage(
          'Cette date est déjà passée. Nous vous conseillons de prévoir votre évènement au moins 24h en avance.'
        );
        return;
      }
      // Permet de retirer les endroits où il y a plus d'un espace entre 2 mots.
      if (descriptionInput) {
        console.log('description avant replace : ', descriptionInput);
        descriptionInput = descriptionInput.replace(/\s+/g, ' ');
        console.log('description avec 1 seul espace max : ', descriptionInput);
      }

      // Si on arrive là, c'est qu'il n'y a plus d'erreur donc on remet le message d'erreur à ''
      setErrorMessage('');

      // On paramètre l'objet Event avec tous les inputs pour pouvoir l'envoyer en props au parent
      const formData: any = {
        title: titleInput,
      date: dateInput,
        time: timeInput,
        description: descriptionInput,
        participants: [],
      };

      onFormSubmit(formData);
    } else {
      setErrorMessage('Tous les champs sont obligatoires');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel label='Titre' className='mb-3'>
        <Form.Control placeholder='Titre' ref={titleRef} required />
      </FloatingLabel>
      <FloatingLabel label='Date' className='mb-3'>
        <Form.Control type='date' placeholder='Date' ref={dateRef} required />
      </FloatingLabel>
      <FloatingLabel label='Heure' className='mb-3'>
        <Form.Control type='time' placeholder='Heure' ref={timeRef} required />
      </FloatingLabel>
      <FloatingLabel label='Description' className='mb-3'>
        <Form.Control
          as='textarea'
          placeholder='Description'
          ref={descriptionRef}
          required
        />
      </FloatingLabel>
      <Button type='submit' className='custom-btn btn-9'>
        Valider
      </Button>
      {/* S'il y a un message d'erreur, on l'affiche dans une alerte */}
      {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
    </Form>
  );
};

export default EventForm;

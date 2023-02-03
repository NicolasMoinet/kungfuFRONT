import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { EventType } from '../models/interface/Event';
import ThumbnailEvent from '../components/ThumbnailEvent';
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import './Recherche.css';
import { useAuth } from '../context/AuthContext';


//Creation de variable tampon pour stocker les filtres actifs, les mettre à jour et déclencher ou non le filtrage global des events
let listEvents: EventType[] = [];
let filteredDate = '';


const Search = () => {
  const [events, setEvents] = useState<EventType[]>([...listEvents]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [dateFilters, setDateFilters] = useState<string>('');
  

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response: AxiosResponse<EventType[]> = await axios.get(
          `http://localhost:8080/api/events`
        );
        console.log('Recherche - fetch Events - Response : ', response.data);

        listEvents = response.data;
        console.log('listEvents objett : ', listEvents);
        setEvents(response.data);
      } catch (error) {
        console.log('Recherche - fetch Events - Error : ', error);
      }
    };
    getEvents();
  }, []);

  ////////////////////////////////////////////////////HANDLEFILTERS///////////////////////////////////////////////////////////////////////////////////

  const handleDatefiltered = (e: React.ChangeEvent<HTMLInputElement>) => {
    filteredDate = e.currentTarget.value;
    setDateFilters(e.currentTarget.value);
    let resultActivFilter = [...activeFilters];
    //on verifie si 'Date' est deja inclus dans resultactivFilter
    let isDateInActivFilter = resultActivFilter.includes('Date');

    //si il n est pas inclus dedans on le rajoute.
    if (!isDateInActivFilter)
      resultActivFilter = [...resultActivFilter, 'Date'];

    setActiveFilters(resultActivFilter);
    console.log('filteredddatetab', resultActivFilter);
    //si il n y a rien on affiche, sinon rien
    allFilter();
  };

  
  const handleRemoveFilter = (filterToRemove: string) => {
    //creer une variable tampon qui récupere une copie d active filer avc le spread
    let activFilterCopy = [...activeFilters];

    //Cette variable doit etre egale au filtre.filtrer le state de filtre actif en gardant les filtres qui ne sont pas le filter dans les parametres
    activFilterCopy = activFilterCopy.filter(
      (activFilter) => filterToRemove !== activFilter
    );
    console.log('handle remove fitre restant apres remove', activFilterCopy);
    //maj setstate actf filt
    setActiveFilters(activFilterCopy);
    // logique pour annuler le fitre : maj state du filtre
    //voir state en haut(refaire state) voir l37
    //maj du state du filtre avec sa valeur initiale voir : setActivity('')
    //maj var avec valeur initial : filterAAAACTTTivity=''
    //On incluera ces elements dans le switch pour le setter et la var
    //faire switch pour reinitialiser les filtres et maj du filtre
    switch (filterToRemove) {
      
      case 'Date':
        filteredDate = '';
        setDateFilters('');
        break;
  
    }
    // on reappelle allFilter pour redeclencher un nouveau filtre en prenant en compte le filtre que l on vient de supprimer
    allFilter();
  };

  
  /////////////////////////////////////////////////ALLFILTERS////////////////////////////////////////////////////////////////////////////
  const allFilter = () => {
    let resultFilteredEvents: EventType[] = [...listEvents];
    
    if (filteredDate) {
      resultFilteredEvents = resultFilteredEvents.filter((event) => {
        const unJourEnMilliSec = 1000 * 60 * 60 * 24;
        // je converti en ms avec dateInputMS avec Date.parse
        let dateInputMS = Date.parse(filteredDate);
        // je converti en ms avec dateEventeMS avec Date.parse
        let dateEventMS = Date.parse(event.date);
        // Soustraire inputDate avec event.date
        let resultDiffDate = dateInputMS - dateEventMS;
        // Conversion de millisecondes vers jours
        let convertMsjs = resultDiffDate / unJourEnMilliSec;
        // Si la différence entre inputDate et event.date [-5; 5] => true

        return (
          convertMsjs <= 5 && convertMsjs >= -5 && dateEventMS > Date.now()
        );

        // Sinon => false
      });
    }

    setEvents(resultFilteredEvents);
  };

  return (
    <Container className='rechercheContenair'>
      <div>
        <h1>Rechercher un événement</h1>
      </div>

      <div className='groupInput'>
                             
            <FloatingLabel label='Date' className='mb-3'>
              {' '}
              <Form.Control
                type='date'
                onChange={handleDatefiltered}
                value={dateFilters}
              />
            </FloatingLabel>
             
      </div>
      <div className='mt-4'>
        <ul className='container-buttonSUPP'>
          {activeFilters.map((filter) => (
            <li key={filter} className='activity filtre'>
              <Button className='deleteButton'>
                {filter}{' '}
                <FontAwesomeIcon
                  icon={faTrashCan}
                  color={'red'}
                  className='ps-2 icon'
                  onClick={() => handleRemoveFilter(filter)}
                />
              </Button>{' '}
            </li>
          ))}
        </ul>
      </div>

      <h2 className='mb-4'>Resultats</h2>
      <ThumbnailEvent events={events} />
    </Container>
  );
};

export default Search;

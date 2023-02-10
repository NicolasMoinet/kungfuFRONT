import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { BlogType } from '../models/interface/Blog';
// import ThumbnailEvent from '../components/ThumbnailEvent';
import {
  Button,
  Card,
  CardGroup,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import './Recherche.css';
// import { useAuth } from '../context/AuthContext';

//Creation de variable tampon pour stocker les filtres actifs, les mettre à jour et déclencher ou non le filtrage global des events
let listBlog: BlogType[] = [];
let filteredDate = '';
let filterSearchBar = '';

const SearchBlog = () => {
  const [blog, setBlog] = useState<BlogType[]>([...listBlog]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [dateFilters, setDateFilters] = useState<string>('');
  const [searchFilters, setSearchFilters] = useState<string>('');

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response: AxiosResponse<BlogType[]> = await axios.get(
          `http://localhost:8080/api/blog`
        );
        console.log('Recherche - fetch articles - Response : ', response.data);

        listBlog = response.data;
        console.log('listBlogobjett : ', listBlog);
        setBlog(response.data);
      } catch (error) {
        console.log('Recherche - fetch articles - Error : ', error);
      }
    };
    getBlog();
  }, []);

  ////////////////////////////////////////////////////HANDLEFILTERS///////////////////////////////////////////////////////////////////////////////////

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterSearchBar = e.currentTarget.value;
    setSearchFilters(filterSearchBar);
    let resultActivFilter = [...activeFilters];
    let isTitleIactiveFilter = resultActivFilter.includes('Title');

    if (!isTitleIactiveFilter)
      resultActivFilter = [...resultActivFilter, 'Title'];
    setActiveFilters(resultActivFilter);
    allFilter();
  };

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

      case 'Title':
        filterSearchBar = '';
        setSearchFilters('');
        break;
    }
    // on reappelle allFilter pour redeclencher un nouveau filtre en prenant en compte le filtre que l on vient de supprimer
    allFilter();
  };

  /////////////////////////////////////////////////ALLFILTERS////////////////////////////////////////////////////////////////////////////
  const allFilter = () => {
    let resultFilteredBlog: BlogType[] = [...listBlog];
    if (filterSearchBar) {
      resultFilteredBlog = resultFilteredBlog.filter((blog) => {
        return blog.title.includes(filterSearchBar);
      });
    }

    if (filteredDate) {
      resultFilteredBlog = resultFilteredBlog.filter((blog) => {
        const unJourEnMilliSec = 1000 * 60 * 60 * 24;
        // je converti en ms avec dateInputMS avec Date.parse
        let dateInputMS = Date.parse(filteredDate);
        // je converti en ms avec dateEventeMS avec Date.parse
        let dateBlogMS = Date.parse(blog.date);
        // Soustraire inputDate avec event.date
        let resultDiffDate = dateInputMS - dateBlogMS;
        // Conversion de millisecondes vers jours
        let convertMsjs = resultDiffDate / unJourEnMilliSec;
        // Si la différence entre inputDate et event.date [-5; 5] => true

        return convertMsjs <= 5 && convertMsjs >= -5 && dateBlogMS > Date.now();

        // Sinon => false
      });
    }

    setBlog(resultFilteredBlog);
  };
  // const image_url = '../../public/assets/montagnerech.jpg';

  return (
    <Container className='rechercheContenair'>
      <div className='bandeauTitreR'>
        <h1>Rechercher un événement</h1>
      </div>
      <img className='imageR' src='assets/fleuve.jpg' alt='shaolin'></img>
      <div className='separation'></div>
      <div className='groupInput'>
        <Row className='rowR mb-3'>
          {/* <Form.Group as={Col}>
            <FloatingLabel label='Titre' className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Title'
                className='mb-3'
                aria-label='Default select example'
                onChange={handleInputSearch}
                value={searchFilters}
              />
            </FloatingLabel>
          </Form.Group> */}
          <Form.Group as={Col}>
            <FloatingLabel label='Date' className='mb-3'>
              {' '}
              <Form.Control
                type='date'
                onChange={handleDatefiltered}
                value={dateFilters}
              />
            </FloatingLabel>
          </Form.Group>
        </Row>
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

      <h2 className='resultats center mb-4'>Articles</h2>
      <div className='container'>
        {blog.map(({ id, title, date, picture, description }) => (
          <Card style={{ width: '25rem' }} key={id}>
            <Card.Img variant='top' src='assets/shaolin' />
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>
                Decouvrez l'article, cliquez sur le lien ci dessous
              </Card.Text>
              <Card.Text>Edité le : {date}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default SearchBlog;

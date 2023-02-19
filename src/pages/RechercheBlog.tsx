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

//Creation de variable tampon pour stocker les filtres actifs, les mettre à jour et déclencher ou non le filtrage global des events
let listBlog: BlogType[] = [];
let filteredDate = '';
let filterSearchBar = '';

const SearchBlog = () => {
  const [blog, setBlog] = useState<BlogType[]>([...listBlog]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [dateFilters, setDateFilters] = useState<string>('');
  const [searchFilters, setSearchFilters] = useState<string>('');
  

  // const [pictures, setPictures] = useState<string>();

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response: AxiosResponse<BlogType[]> = await axios.get(
          `http://localhost:8080/api/blog`
        );

        listBlog = response.data;

        setBlog(listBlog);
      } catch (error) {
        console.log('Recherche - fetch articles - Error : ', error);
      }
    };
    getBlog();
  }, []);

  /*const getImage = async (imageName: string) => {
    const response = await axiosPrivate.get(
      `http://localhost:8080/api/blog/${imageName}`,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      }
    );
    const blob = response.data;

    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      let base64Data = reader.result;
      if (base64Data) {
        return base64Data.toString();
      }
    };
  };*/
  //////////////////////////////////////////////////////Galerie//////////////////////////////////////////////////
  // const handleClickGalery = (e: React.MouseEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   const isShowing = e.currentTarget.classList.contains('show');
  //   if (showing) {
  //     setShowing(false);
  //     if (isShowing) {
  //       e.currentTarget.classList.remove('show');
  //     } else {
  //       e.currentTarget.classList.add('show');
  //       e.currentTarget.style.zIndex = `${zIndex}`;
  //       setZIndex(zIndex + 1);
  //     }
  //   } else {
  //     setShowing(true);
  //     e.currentTarget.classList.add('show');
  //     e.currentTarget.style.zIndex = `
  //       ${zIndex}`;
  //     setZIndex(zIndex + 1);
  //   }
  // };

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
        setBlog(listBlog);
        break;

      case 'Title':
        filterSearchBar = '';
        setSearchFilters('');
        setBlog(listBlog);
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
        return blog.title
          .toLocaleLowerCase()
          .includes(filterSearchBar.toLocaleLowerCase());
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
    <div className='rechercheContenair'>
      <div className='bandeauTitreR'>
        <h1>Rechercher un article</h1>
      </div>
      <img className='imageR' src='assets/fleuve.jpg' alt='shaolin'></img>
      <div className='separation'></div>
      <div className='groupInput'>
        <Row className='rowR mb-3'>
          <Form.Group as={Col} md>
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
          </Form.Group>
          <Form.Group as={Col} md>
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
              <Button className='custom-btn btn-9'>
                {filter}{' '}
                <FontAwesomeIcon
                  icon={faTrashCan}
                  color={'white'}
                  className='ps-2 icon'
                  onClick={() => handleRemoveFilter(filter)}
                />
              </Button>{' '}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ margin: '3rem' }}>
        <h2 className='resultats center mb-4'>Articles</h2>
        <Row>
          {blog.map(({ id, title, date, picture }) => (
            <Col md={4} key={id} className='mb-4'>
              <Card style={{ height: '100%' }}>
                {picture ? (
                  <Card.Img
                    variant='top'
                    src={`http://localhost:8080/api/blog/${picture}`}
                    style={{ objectFit: 'cover', height: '200px' }}
                  />
                ) : (
                  <Card.Img
                    src='assets/Ellipse.png'
                    alt='aigle'
                    style={{ objectFit: 'cover', height: '200px' }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>
                    Decouvrez l'article, cliquez sur le lien ci dessous
                  </Card.Text>
                  <Card.Text>Edité le : {date}</Card.Text>
                </Card.Body>
                <Card.Footer className='d-flex justify-content-center'>
                  <button className='custom-btn btn-9'>Lire</button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default SearchBlog;

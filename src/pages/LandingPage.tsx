import Header from '../components/Header';
import { Navigation, Pagination } from 'swiper';
import { useEffect, useState } from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { NavLayout } from '../App';
import Footer from '../components/Footer';
import { useEvents } from '../context/EventsContext';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { events } = useEvents();
  const { currentUser } = useAuth();

  return (
    <>
      <div className='landing-page'>
        {currentUser ? <NavLayout /> : <Header />}
        {/* si l'utilisateur est deja connecte on voudrait voir le composent Navlo que le comp Header  */}
        <section className='section-slogan'>
          {/* <img className='Fond-head' src='vector4.svg' alt='Montagne'/> */}
          <div className='Titre'>
            <h1>Xiong Ying Wushuguan</h1>
            <p> ONLY ONE OPPONENT : YOURSELF </p>
          </div>
        </section>
        {/* <section> */}
        {/* <div>
            <div>
              <h4>Bienvenue sur le site de l'association</h4>
            </div>
            <div>
              <h3>L'ecole de l'aigle bienveillant</h3>
              <p> 
                Créer récemment, notre école est issue d'une volonté commune de
                se retrouver autour
                blablabalbalbablabalbalalblballbalbalbalbalblabl{' '}
              </p>
            </div> */}
        {/* </div> */}

        {/* </section> */}
      </div>
      <Footer />
    </>
  );
};
export default LandingPage;

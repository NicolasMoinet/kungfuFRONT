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
          <div className='text-slogan'>ONLY ONE OPPONENT : YOURSELF </div>
          <div className='photo-bandeau'>
            <div className='image-nico'>
              <img className='image-bandeau'
                src='/assets/BandeauACC.svg'
                alt='bandeau'
              />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};
export default LandingPage;

import Header from '../components/Header';
import { useEffect, useState } from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import { NavLayout } from '../App';
import Footer from '../components/Footer';
import { useEvents } from '../context/EventsContext';
import { useAuth } from '../context/AuthContext';
import { Image } from 'react-bootstrap';
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
            <h1 className='xy'>Xiong Ying Wushuguan</h1>
            <p className='opponent'> ONLY ONE OPPONENT : YOURSELF </p>
          </div>
        </section>
        <div className='prez'>
          <div className='minititre'>
            <div className='prezTitre'>
              <h6 className='mb-0'>Bienvenue sur le site de l'association</h6>
            </div>
            <div>
              <h3 className='mb-15'>L'école de l'aigle bienveillant</h3>
              <p className='blabla'>
                Notre association est issue d'une volonté de nous retrouver
                autour de notre passion commune le Kung-fu wu shu. Fort de 30
                ans d'experience, Jacky Juste (6eme Duan) vous acompagnera dans
                votre apprentissage, technique, mais aussi combat.
              </p>
            </div>
          </div>
          <img
            className='montagne img-thumbmail'
            src='assets/montagnerech.jpg'
            alt='montagne'
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default LandingPage;

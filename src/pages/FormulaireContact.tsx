import { faHouse, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button1 from '../components/Button1';
import './FormulaireContact.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FormulaireContact = () => {
  // Définition du composant popover qui va s'afficher quand on essaie de contacter un organisateur
  const popover = (
    <Popover>
      <Popover.Body>
        Merci d'avoir rempli ce formulaire ! Nous reviendrons vers vous dès que
        possible
      </Popover.Body>
    </Popover>
  );
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
    <div className='ContactForm'>
      <section className='bandeauFC'>
        {/* <img className='bandeauLP' src='/assets/BeandeauACC.svg' alt='fond' />; */}
        <div className='titreee' data-aos='fade-right' data-aos-duration='1000'>
          <h1>Contact</h1>
        </div>
      </section>
      <div className='imageconteneur'>
        <img
          className='imageR'
          src='assets/erable2.jpg'
          alt='calligraphie'
          data-aos='zoom-out'
          data-aos-duration='6000'
        ></img>
      </div>
      <div className='containerFC'>
        <div className='boxiconFC'>
          <Link to={'/'} className='iconFC'>
            <div className='nav-link nav-iconFC'>
              <FontAwesomeIcon
                icon={faLeaf}
                color={'#af88f4'}
                className='iconNB'
              />
            </div>
          </Link>
        </div>
        <div className='rowFC'>
          <div className='col-12 text-center'>
            <div className='contactForm'>
              <form id='contact-form' noValidate>
                {/* Row 1 of form */}
                <div className='row formRow mb-4'>
                  <div className='col-6'>
                    <input
                      type='text'
                      name='name'
                      className='form-control formInput'
                      placeholder='Nom'
                    ></input>
                  </div>
                  <div className='col-6 '>
                    <input
                      type='email'
                      name='email'
                      className='form-control formInput'
                      placeholder='Email'
                    ></input>
                  </div>
                </div>
                {/* Row 2 of form */}
                <div className='row formRow mb-4'>
                  <div className='col'>
                    <input
                      type='text'
                      name='subject'
                      className='form-control formInput'
                      placeholder='Sujet'
                    ></input>
                  </div>
                </div>
                {/* Row 3 of form */}
                <div className='row formRow'>
                  <div className='col'>
                    <textarea
                      rows={3}
                      name='message'
                      className='form-control formInput'
                      placeholder='Message'
                    ></textarea>
                  </div>
                </div>
                <OverlayTrigger
                  trigger='click'
                  placement='top'
                  overlay={popover}
                >
                  <Button1 />
                </OverlayTrigger>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaireContact;

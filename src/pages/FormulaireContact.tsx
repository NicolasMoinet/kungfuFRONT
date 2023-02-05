import { faHouse, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './FormulaireContact.css';
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
  return (
    <div className='ContactForm'>
      <section className='bandeauFC'>
      {/* <img className='bandeauLP' src='/assets/BeandeauACC.svg' alt='fond' />; */}
        <h2 className='titleFC'>Formulaire Contact </h2>
      </section>
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
                <div className='row formRow'>
                  <div className='col-6'>
                    <input
                      type='text'
                      name='name'
                      className='form-control formInput'
                      placeholder='Nom'
                    ></input>
                  </div>
                  <div className='col-6'>
                    <input
                      type='email'
                      name='email'
                      className='form-control formInput'
                      placeholder='Email'
                    ></input>
                  </div>
                </div>
                {/* Row 2 of form */}
                <div className='row formRow'>
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
                  <Button className='button-returnFC'>
                    Envoyer le formulaire
                  </Button>
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

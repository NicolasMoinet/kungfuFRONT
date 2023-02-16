import Header from '../components/Header';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import { NavLayout } from '../App';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import Button0 from '../components/Button0';
import Button1 from '../components/Button1';

const LandingPage = () => {
  const { currentUser } = useAuth();
  console.log('current userrrrrrr', currentUser);
  return (
    <>
      <div className='landing-page'>
        {currentUser ? <NavLayout /> : <Header />}
        {/* si l'utilisateur est deja connecte on voudrait voir le composent Navlo que le comp Header  */}
        <section className='section-slogan'>
          {/* <img className='Fond-head' src='vector4.svg' alt='Montagne'/> */}
          <div className='Titre'>
            <h1 className='xy'>Xiong Ying WushuGuan</h1>
            <p className='opponent'> ONLY ONE OPPONENT : YOURSELF </p>
          </div>
          <div>
            <img className='aigle' src='assets/Ellipse.png' alt='aigle' />
          </div>
        </section>
        <div className='prez'>
          <div className='minititre'>
            <div className='prezTitre'>
              <h6 className='mb-0'>Bienvenue sur le site de l'association</h6>
            </div>
            <div>
              <h3 className='ecole mb-15'>L'école de l'aigle bienveillant</h3>
              <p className='blabla'>
                Notre association est issue d'une volonté de nous retrouver
                autour de notre passion commune le Kung-fu Wushu. Fort de 30 ans
                d'experience, Jacky Juste (6eme Duan) vous accompagnera dans
                votre apprentissage.
              </p>
            </div>
          </div>

          <div className='contactLP'>
            <h2 className='contactTitre '>Contactez nous</h2>
            <p className='contactSousTitre mb-15 '>
              Cliquez sur le lien ci dessous
            </p>
            <Link to={'/formulairecontact'}>
              {/* <div className='nav-link'>
                <FontAwesomeIcon
                  icon={faEnvelopesBulk}
                  color={'white'}
                  className='iconNB fa-2xl'
                /> */}

              <Button1 />
              {/* </div> */}
            </Link>
          </div>
          <div className='cubeLP'></div>
        </div>
      </div>
      <div>
        <img
          className='montagne img-thumbmail'
          src='assets/montagnerech.jpg'
          alt='montagne'
        />
      </div>
      <Footer />
    </>
  );
};
export default LandingPage;

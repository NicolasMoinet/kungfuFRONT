import Header from '../components/Header';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import { NavLayout } from '../App';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import Button1 from '../components/Button1';
import { Card, Col, Row } from 'react-bootstrap';

const LandingPage = () => {
  const { currentUser } = useAuth();
  console.log('current userrrrrrr', currentUser);
  return (
    <>
      <div className='landing-page'>
        {currentUser ? <NavLayout /> : <Header />}
        {/* si l'utilisateur est deja connecte on voudrait voir le composent Navlo que le comp Header  */}
        <section className='section-slogan'>
          <div className='Titre'>
            <img
              className='Fond-head '
              src='assets/BandeauACC.svg'
              alt='Montagne'
            />
            <div className='Bandeau1'>
              <h1 className='xy'>Xiong Ying Wushu Guan</h1>
              {/* <p className='opponent'> ONLY ONE OPPONENT : YOURSELF </p> */}
            </div>
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
            <h2 className='contactTitre '>Contact</h2>

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
      <section className='prezzz2'>
        <Row className='justify-content-center'>
          <Col md={4} className='mb-4'>
            <Card style={{ height: '100%' }}>
              <Card.Img
                variant='top'
                src={`/assets/dragon.png`}
                style={{ objectFit: 'cover', height: '200px' }}
              />

              <Card.Body>
                <Card.Title>Coucou</Card.Title>
                <Card.Text>
                  Decouvrez l'article, cliquez sur le lien ci dessous
                </Card.Text>
              </Card.Body>
              <Card.Footer className='d-flex justify-content-center'>
                <button className='custom-btn btn-9'>Lire</button>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={4} className='mb-4'>
            <Card style={{ height: '100%' }}>
              <Card.Img
                variant='top'
                src={`/public/assets/dragon`}
                style={{ objectFit: 'cover', height: '200px' }}
              />

              <Card.Body>
                <Card.Title>Coucou</Card.Title>
                <Card.Text>
                  Decouvrez l'article, cliquez sur le lien ci dessous
                </Card.Text>
              </Card.Body>
              <Card.Footer className='d-flex justify-content-center'>
                <button className='custom-btn btn-9'>Lire</button>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={4} className='mb-4 px-4'>
            <Card style={{ height: '100%' }}>
              <Card.Img
                variant='top'
                src={`/public/assets/dragon`}
                style={{ objectFit: 'cover', height: '200px' }}
              />

              <Card.Body>
                <Card.Title>Coucou</Card.Title>
                <Card.Text>
                  Decouvrez l'article, cliquez sur le lien ci dessous
                </Card.Text>
              </Card.Body>
              <Card.Footer className='d-flex justify-content-center'>
                <button className='custom-btn btn-9'>Lire</button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </section>
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

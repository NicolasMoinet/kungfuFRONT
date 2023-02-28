import Header from '../components/Header';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import { NavLayout } from '../App';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import Button1 from '../components/Button1';
import { Card, Col, Modal, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { BlogType } from '../models/interface/Blog';
import axios, { AxiosResponse } from 'axios';
import { Parallax } from 'react-parallax';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AosOptions } from 'aos';
// import ReactAOS from 'react-aos'

let listBlog: BlogType[] = [];

const LandingPage = () => {
  const { currentUser } = useAuth();
  console.log('current userrrrrrr', currentUser);
  const [blog, setBlog] = useState<BlogType[]>([...listBlog]);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

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

  useEffect(() => {
    AOS.init({
      duration: 3000,
      offset: 200,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);

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
              data-aos='zoom-out'
              data-aos-easing='linear'
              data-aos-duration='1500'
            />
            <div className='Bandeau1'>
              <h1
                className='xy'
                data-aos='fade-right'
                data-aos-offset='300'
                data-aos-easing='ease-in-sine'
              >
                Xiong Ying Wushu Guan
              </h1>
              {/* <p className='opponent'> ONLY ONE OPPONENT : YOURSELF </p> */}
            </div>
          </div>
          <div>
            {/* <div data-aos="zoom-out"> */}
            <img
              className='aigle'
              src='assets/Ellipse.png'
              alt='aigle'
              data-aos='fade-down-left'
              // data-aos-anchor-placement='top-bottom'
            />
            {/* </div> */}
          </div>
        </section>

        <div className='prez'>
          <div
            className='minititre'
            // data-aos='slide-right'
            // data-aos-duration='500'
            // data-aos-easing='ease-in-out'
            // data-aos-delay='200'
          >
            <div
              className='prezTitre'
              data-aos='slide-right'
              data-aos-duration='400'
              data-aos-delay='50'
            >
              <h6 className='mb-0'>Bienvenue sur le site de l'association</h6>
            </div>
            <div>
              <h3
                className='ecole mb-15'
                data-aos='slide-right'
                data-aos-duration='400'
                data-aos-delay='150'
              >
                L'école de l'aigle bienveillant
              </h3>
              <p
                className='blabla'
                data-aos='slide-right'
                data-aos-duration='400'
                data-aos-delay='300'
              >
                Notre association est issue d'une volonté de nous retrouver
                autour de notre passion commune le Kung-fu Wushu. Fort de 30 ans
                d'experience, Jacky Juste (6eme Duan) vous accompagnera dans
                votre apprentissage.
              </p>
            </div>
          </div>

          <div
            className='contactLP'
            data-aos='flip-left'
            data-aos-easing='ease-out-cubic'
            data-aos-duration='2000'
            data-aos-delay='310'
          >
            <img src='/assets/dragon.png' alt='Dragon' />
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

      <Parallax
        blur={{ min: 0, max: 0 }}
        bgImage='/assets/erable1.jpg'
        bgImageAlt='parallaxBamboo'
        strength={800}
        className='hide-on-mobile'
        // style={{ backgroundSize: '80% auto' }}
      >
        <div>
          <p className='titrepratiques'> Decouvrez nos pratiques ! </p>
        </div>
        <section className='prezzz2'>
          <Row className='justify-content-center '>
            <Col
              md={4}
              className='mb-4'
              data-aos='fade-up'
              data-aos-duration='300'
            >
              <Card style={{ height: '100%' }}>
                <Card.Img
                  variant='top'
                  src='/assets/jackypudao.jpg'
                  style={{ objectFit: 'cover', height: '250px' }}
                />

                <Card.Body>
                  <Card.Title>Coucou</Card.Title>
                  <Card.Text>
                    Decouvrez l'article, cliquez sur le lien ci dessous
                  </Card.Text>
                </Card.Body>
                <Card.Footer className='d-flex justify-content-center'>
                  <button
                    className='custom-btn btn-9'
                    onClick={() => setShow1(true)}
                  >
                    Lire
                  </button>
                </Card.Footer>
              </Card>
            </Col>
            <Col
              md={4}
              className='mb-4'
              data-aos='fade-up'
              data-aos-duration='300'
              data-aos-delay='100'
            >
              <Card style={{ height: '100%' }}>
                <Card.Img
                  variant='top'
                  src='/assets/sanda.jpg'
                  style={{ objectFit: 'cover', height: '250px' }}
                />

                <Card.Body>
                  <Card.Title>Coucou</Card.Title>
                  <Card.Text>
                    Decouvrez l'article, cliquez sur le lien ci dessous
                  </Card.Text>
                </Card.Body>
                <Card.Footer className='d-flex justify-content-center'>
                  <button
                    className='custom-btn btn-9'
                    onClick={() => setShow2(true)}
                  >
                    Lire
                  </button>
                </Card.Footer>
              </Card>
            </Col>
            <Col
              md={4}
              className='mb-4 '
              data-aos='fade-up'
              data-aos-duration='300'
              data-aos-delay='200'
            >
              <Card style={{ height: '100%' }}>
                <Card.Img
                  variant='top'
                  src='/assets/lutte.jpeg'
                  style={{ objectFit: 'cover', height: '250px' }}
                />

                <Card.Body>
                  <Card.Title>Coucou</Card.Title>
                  <Card.Text>
                    Decouvrez l'article, cliquez sur le lien ci dessous
                  </Card.Text>
                </Card.Body>
                <Card.Footer className='d-flex justify-content-center'>
                  <button
                    className='custom-btn btn-9'
                    onClick={() => setShow3(true)}
                  >
                    Lire
                  </button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </section>
        <p className='titrepratiques'> Decouvrez notre blog ! </p>
        <section className='prezzz3'>
          <div style={{ margin: '3rem' }}>
            <Row>
              {blog.slice(0, 3).map(({ id, title, date, picture }) => (
                <Col
                  md={4}
                  key={id}
                  className='mb-4'
                  data-aos='fade-up'
                  data-aos-duration='300'
                  data-aos-delay='10'
                >
                  <Card style={{ height: '100%' }}>
                    {picture ? (
                      <Card.Img
                        variant='top'
                        src={`http://localhost:8080/api/blog/${picture}`}
                        style={{ objectFit: 'cover', height: '200px' }}
                      />
                    ) : (
                      <Card.Img
                        src='/assets/Ellipse.png'
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
                      <Link to={`/article/${id}`}>
                        <button className='custom-btn btn-9'>Lire</button>
                      </Link>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>
      </Parallax>
      <>
        <Modal
          show={show1}
          onHide={() => setShow1(false)}
          dialogClassName='modal-90w'
          aria-labelledby='example-custom-modal-styling-title'
        >
          <Modal.Header closeButton>
            <Modal.Title id='example-custom-modal-styling-title'>
              Custom Modal Styling
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae
              unde commodi aspernatur enim, consectetur. Cumque deleniti
              temporibus ipsam atque a dolores quisquam quisquam adipisci
              possimus laboriosam. Quibusdam facilis doloribus debitis! Sit
              quasi quod accusamus eos quod. Ab quos consequuntur eaque quo rem!
              Mollitia reiciendis porro quo magni incidunt dolore amet atque
              facilis ipsum deleniti rem!
            </p>
          </Modal.Body>
        </Modal>
        <Modal
          show={show2}
          onHide={() => setShow2(false)}
          dialogClassName='modal-90w'
          aria-labelledby='example-custom-modal-styling-title'
        >
          <Modal.Header closeButton>
            <Modal.Title id='example-custom-modal-styling-title'>
              Custom Modal Styling
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae
              unde commodi aspernatur enim, consectetur. Cumque deleniti
              temporibus ipsam atque a dolores quisquam quisquam adipisci
              possimus laboriosam. Quibusdam facilis doloribus debitis! Sit
              quasi quod accusamus eos quod. Ab quos consequuntur eaque quo rem!
              Mollitia reiciendis porro quo magni incidunt dolore amet atque
              facilis ipsum deleniti rem!
            </p>
          </Modal.Body>
        </Modal>
        <Modal
          show={show3}
          onHide={() => setShow3(false)}
          dialogClassName='modal-90w'
          aria-labelledby='example-custom-modal-styling-title'
        >
          <Modal.Header closeButton>
            <Modal.Title id='example-custom-modal-styling-title'>
              Custom Modal Styling
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae
              unde commodi aspernatur enim, consectetur. Cumque deleniti
              temporibus ipsam atque a dolores quisquam quisquam adipisci
              possimus laboriosam. Quibusdam facilis doloribus debitis! Sit
              quasi quod accusamus eos quod. Ab quos consequuntur eaque quo rem!
              Mollitia reiciendis porro quo magni incidunt dolore amet atque
              facilis ipsum deleniti rem!
            </p>
          </Modal.Body>
        </Modal>
      </>
      <div className='separation'>
        <div>
          <p
            style={{
              fontSize: '18px',
              fontWeight: 'bolder',
              marginRight: '15px',
            }}
          >
            Vous cherchez à pratiquer un art martial sur Faches-Thumesnil ?
            Venez nous retrouver et faire un essai au centre social du Chemin
            Rouge, les vendredis à 19h.
          </p>
        </div>
        {/* <div>
          <img src='/assets/nicomini.png' alt='pose Kungfu' />
        </div> */}
      </div>
      <div>
        <div className='imageconteneur'>
          <img
            className='montagne img-thumbmail'
            src='assets/montagnerech.jpg'
            alt='montagne'
            data-aos='zoom-out'
            data-aos-duration='6000'
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default LandingPage;

import Header from '../components/Header';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import { NavLayout } from '../App';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import Button1 from '../components/Button1';
import { Card, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { BlogType } from '../models/interface/Blog';
import axios, { AxiosResponse } from 'axios';

let listBlog: BlogType[] = [];

const LandingPage = () => {
  const { currentUser } = useAuth();
  console.log('current userrrrrrr', currentUser);
  const [blog, setBlog] = useState<BlogType[]>([...listBlog]);
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
      <div>
        <p className='titrepratiques'> Decouvrez nos pratiques ! :</p>
      </div>
      <section className='prezzz2'>
        <Row className='justify-content-center'>
          <Col md={4} className='mb-4'>
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
                <button className='custom-btn btn-9'>Lire</button>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={4} className='mb-4'>
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
                <button className='custom-btn btn-9'>Lire</button>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={4} className='mb-4 px-4'>
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
                <button className='custom-btn btn-9'>Lire</button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </section>
      <p className='titrepratiques'> Decouvrez notre blog ! :</p>
      <section className='prezzz3'>
        <div style={{ margin: '3rem' }}>
          <Row>
            {blog.slice(0, 3).map(({ id, title, date, picture }) => (
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
                    <button className='custom-btn btn-9'>Lire</button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
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

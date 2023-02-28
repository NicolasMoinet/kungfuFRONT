import { useParams } from 'react-router-dom';
import './Article.css';
import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { BlogType } from '../models/interface/Blog';
import { useBlog } from '../context/BlogContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

// type BlogProps = {
//   // on récupere depuis le parent la liste d'evenements qui sera eventuellement filtrée
//   blog: BlogType;
// };
function Article() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState<BlogType>();
  // const { blog } = useBlog();

  useEffect(() => {
    console.log('idddddaritcleee', id);
    const getBlog = async () => {
      try {
        const response: AxiosResponse<BlogType> = await axios.get(
          `http://localhost:8080/api/blog/one/${id}`
        );

        setBlogs(response.data);
      } catch (error) {
        console.log('Recherche - fetch articles - Error : ', error);
      }
    };
    getBlog();
  }, [id]);
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
    <div>
      {blogs && (
        <>
          <div className='bandeauTitreA'>
            <div
              className='titreee'
              data-aos='fade-right'
              data-aos-duration='1000'
            >
              <h1>{blogs.title}</h1>
            </div>
          </div>
          <div className='imageconteneur'>
            <img
              className='imageR'
              src='/assets/bamboo.jpg'
              alt='shaolin'
              data-aos='zoom-out'
              data-aos-duration='6000'
            ></img>
          </div>
          <div className='blogCont'>
            <div className='articlecontenair'>
              <p>{blogs.description}</p>
            </div>
            {/* <h3>{blogs.date}</h3> */}
            <div className='picturearticle'>
              {blogs.picture ? (
                <img
                  src={`http://localhost:8080/api/blog/${blogs.picture}`}
                  alt='article'
                />
              ) : (
                <img src='/assets/Ellipse.png' alt='aigle' />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default Article;

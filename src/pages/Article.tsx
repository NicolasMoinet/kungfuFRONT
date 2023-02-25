import { useParams } from 'react-router-dom';
import './Article.css';
import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { BlogType } from '../models/interface/Blog';
import { useBlog } from '../context/BlogContext';

function Article() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState<BlogType>();
  const { blog } = useBlog();

  useEffect(() => {
    console.log('idddddaritcleee', id);
    const getBlog = async () => {
      try {
        const response: AxiosResponse<BlogType> = await axios.get(
          `http://localhost:8080/api/blog/${id}`
        );

        setBlogs(response.data);
      } catch (error) {
        console.log('Recherche - fetch articles - Error : ', error);
      }
    };
    getBlog();
  }, [id]);

  return (
    <div>
      <ul>
        {blogs && (
          <>
            <h1>{blogs.title}</h1>
            <h3>{blogs.date}</h3>
            {/* <div className='picturearticle'>
              {blog.picture ? (
                <img
                  src={`http://localhost:8080/api/blog/${blog.picture}`}
                  alt='article'
                />
              ) : (
                <img src='assets/Ellipse.png' alt='aigle' />
              )}
            </div> */}
            <p>{blogs.description}</p>
          </>
        )}
      </ul>
    </div>
  );
}
export default Article;

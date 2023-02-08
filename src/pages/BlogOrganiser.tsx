import React, { useEffect, useState, FormEvent, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from 'react-bootstrap';

import { useToast } from '../context/ToastContext';
import useAxiosPrivate from '../api/useAxiosPrivate';
import './BlogOrganiser.css';
import { isValid } from '../models/form-validate/validation';
import { errorInfo } from '../models/form-validate/errorMessage';

import { BlogType } from '../models/interface/Blog';
import { WriterType } from '../models/interface/Writer';
import { useBlog } from '../context/BlogContext';

const BlogOrganiser = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [errorApiMessage, setErrorApiMessage] = useState<string[]>([]);

  const axiosPrivate = useAxiosPrivate();

  const { handleToast } = useToast();
  const { blog, setBlog } = useBlog();

  const title = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);
  const descrip = useRef<HTMLTextAreaElement>(null);
  //   const picture = useRef<HTMLSelectElement>(null)

  const handleSubmitForm = (e: FormEvent) => {
    //quand on click sur le button pour envoyer les données
    e.preventDefault();
    setErrorApiMessage([]);

    const titleInput = title.current?.value;
    const dateInput = date.current?.value;
    // let picture = picture.current?.value;
    let descripInput = descrip.current?.value;

    if (titleInput && dateInput && descripInput) {
      if (titleInput && !isValid('title', titleInput)) {
        setErrorMsg(errorInfo('title'));
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
        return;
      }

      //   if (descripInput && !isValid('description', descripInput)) {
      //     setErrorMsg(errorInfo('description'));
      //     setTimeout(() => {
      //       setErrorMsg('');
      //     }, 5000);
      //     return;
      //   }

      // Permet de retirer les endroits où il y a plus d'un espace entre 2 mots.

      let userInsert = {
        title: titleInput,
        date: dateInput,
        description: descripInput,
      };
      console.log(userInsert);

      axiosPrivate
        .post('/blog', userInsert)
        .then((response) => {
          let blogData = response.data;
          console.log('organiser, blogData evenement crée : ', blogData);

          let updatedBlogList = [...blog];

          if (response.status === 201) {
            blogData = { ...blogData, writer: [] };

            // On rajoute cet évènement à notre liste d'évènements et on met à jour le state du context avec
            updatedBlogList = [...updatedBlogList, blogData];
            setBlog(updatedBlogList);
            setErrorMsg('');
            handleToast({
              message: 'Votre article a bien été créé !',
              color: 'success',
              delay: 5000,
            });
            navigate('/user/interface');
          }
        })

        .catch((error) => {
          console.log('Organiser - HandleSubmit Error : ', error);
          if (error.response.status === 401) {
            localStorage.removeItem('accessToken');
            navigate('/connexion');
            return;
          }
          setErrorApiMessage(error.response.data.message);
        });
    } else {
      setErrorMsg('Tous les champs sont obligatoires');
      setTimeout(() => {
        setErrorMsg('');
      }, 5000);
    }
  };

  return (
    <>
      <div className='bandeauTitreBO'>
        <h2>Créer son Article </h2>
      </div>
      <Container className='containerBO'>
        <form onSubmit={handleSubmitForm}>
          <Row>
            <Form.Group as={Col}>
              <FloatingLabel label='Titre article' className='mb-3'>
                {' '}
                <Form.Control
                  required
                  ref={title}
                  placeholder='Titre article'
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group as={Col}>
              <FloatingLabel label='Date' className='mb-3'>
                <Form.Control type='date' ref={date} required />
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Form.Group className='py-3' controlId='exampleForm.ControlTextarea1'>
            <Form.Label>Article</Form.Label>
            <Form.Control
              as='textarea'
              type='text'
              rows={7}
              ref={descrip}
              required
            />
          </Form.Group>
          <Button className='button-signup my-3' type='submit'>
            Créer
          </Button>
          {errorMsg && <Alert variant='danger'>{errorMsg}</Alert>}
          {errorApiMessage &&
            errorApiMessage.map((error, i) => (
              <Alert key={i} variant='danger'>
                {error}
              </Alert>
            ))}
        </form>
      </Container>
    </>
  );
};

export default BlogOrganiser;

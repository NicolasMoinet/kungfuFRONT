import React, { useEffect, useState, FormEvent, useRef } from 'react';
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
import { useBlog } from '../context/BlogContext';
import Button1 from '../components/Button1';

const BlogOrganiser = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [errorApiMessage, setErrorApiMessage] = useState<string[]>([]);
  const [pictures, setPictures] = useState<File>();
  const axiosPrivate = useAxiosPrivate();

  const { handleToast } = useToast();
  const { blog, setBlog } = useBlog();

  const title = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);
  const descrip = useRef<HTMLTextAreaElement>(null);
  //   const picture = useRef<HTMLSelectElement>(null)

  const pictureUploader = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = event.target.files?.[0];
    if (!files) {
      return;
    }
    setPictures(files);
  };

  const handleSubmitForm = (e: FormEvent) => {
    //quand on click sur le button pour envoyer les données
    e.preventDefault();
    setErrorApiMessage([]);

    const titleInput = title.current?.value;
    const dateInput = date.current?.value;

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

      // Permet de retirer les endroits où il y a plus d'un espace entre 2 mots.peut etre pas valide comme restriction ici ?

      // let userInsert = {
      //   title: titleInput,
      //   date: dateInput,
      //   description: descripInput,
      // };

      const formData = new FormData();

      formData.append('title', titleInput);
      formData.append('date', dateInput);
      formData.append('description', descripInput);
      formData.append('picture', pictures || '');

      axiosPrivate({
        method: 'post',
        url: '/blog',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        // .then((response) => response.blob)
        // .then((response) => {
        //   const reader = new FileReader();
        //   reader.readAsDataURL(response.data);
        //   reader.onloadend = () => {
        //     let base64Data = reader.result;
        //     if (base64Data) {
        //       setPictures(base64Data.toString());
        //     }
        //   };
        // })
        .then((response) => {
          let blogData = response.data;
          console.log('organiser, blogData article crée : ', blogData);

          let updatedBlogList = [...blog];

          if (response.status === 201) {
            blogData = { ...blogData, writer: [] };

            // On rajoute cet article à notre liste de blog et on met à jour le state du context avec
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
        <h1>Créer son Article </h1>
      </div>
      <img
        className='imageR'
        src='assets/calligraphie.jpg'
        alt='calligraphie'
      ></img>
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
          <div>
            <input type='file' onChange={pictureUploader} />
          </div>
          <div className='button9'>
            <Button className='custom-btn btn-9' type='submit'>
              Créer
            </Button>
          </div>
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

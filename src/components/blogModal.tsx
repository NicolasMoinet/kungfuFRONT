import React, { useEffect, useState } from 'react';
// import axios, { AxiosResponse } from 'axios';
// import Modal from 'react-bootstrap/Modal';
// import './blogModal.css';
// import { BlogType } from '../models/interface/Blog';
// import { useBlog } from '../context/BlogContext';
// import { useAuth } from '../context/AuthContext';
// import useAxiosPrivate from '../api/useAxiosPrivate';
// import { useParams } from 'react-router-dom';

// interface BlogModalProps {
//   onBlogDeleteByAdmin?: { (deletedBlog: BlogType): void };
// }

// const BlogModal = ({ onBlogDeleteByAdmin }: BlogModalProps) => {
//   const { blog, setBlog } = useBlog();
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const { currentUser } = useAuth();
//   const axiosPrivate = useAxiosPrivate();
//   const { id } = useParams();
//   const [blogs, setBlogs] = useState<BlogType>();
//   const [show, setShow] = useState(false);
//   // const blogKeysList = Object.keys(blogKeys);
//   const [fullscreen, setFullscreen] = useState(true);

//   useEffect(() => {
//     console.log('idddddaritcleee', id);
//     const getBlog = async () => {
//       try {
//         const response: AxiosResponse<BlogType> = await axios.get(
//           `http://localhost:8080/api/blog/one/${id}`
//         );

//         setBlogs(response.data);
        
//       } catch (error) {
//         console.log('Recherche - fetch articles - Error : ', error);
//       }
//     };
//     getBlog();
//   }, [id]);

//   const handleCancelBlog = async () => {
//     if (blogs) {
//       try {
//         // Vérifier si l'utilisateur actuel est un administrateur

//         const response: AxiosResponse = await axiosPrivate.delete(
//           `/blog/${blogs.id}`
//         );
//         console.log('Annulation Blog - Response : ', response.data);
//         setSuccessMessage(
//           'Article annulé. Redirection automatique. A bientôt !'
//         );
//         onBlogDeleteByAdmin && onBlogDeleteByAdmin(blogs);
//         // const remainingBlog = blogs.filter(
//         //   (blogDeLaList) => blogDeLaList.id !== blogs.id
//         // );

//         // On met à jour le state des articles pour lancer un rerender du dashboard et avoir la liste rafraichie des events
//         // setBlogs(remainingBlog);
//         setTimeout(() => {
//           setBlogs(undefined);
//           setSuccessMessage('');
//         }, 3000);
//       } catch (error) {
//         console.log('Annulation Blogs - Error : ', error);
//         setErrorMessage(
//           'Une erreur est survenue. Veuillez réessayer plus tard.'
//         );
//         setTimeout(() => {
//           setErrorMessage('');
//         }, 3000);
//       }
//     }
//   };
//   return (
//     <>
//       <Modal show={show}  onHide={() => setShow(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>{blogs.title}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Modal body content</Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default BlogModal;

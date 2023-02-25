 import React, { useState } from 'react';
// import { AxiosResponse } from 'axios';
// import Modal from 'react-bootstrap/Modal';
// import './blogModal.css';
// import { BlogType } from '../models/interface/Blog';
// import { useBlog } from '../context/BlogContext';
// import { useAuth } from '../context/AuthContext';
// import useAxiosPrivate from '../api/useAxiosPrivate';


// interface BlogModalProps {
//   blogArticle: BlogType | undefined;
//   setBlogArticle: React.Dispatch<React.SetStateAction<BlogType | undefined>>;
//   show: boolean;
//   setShow: React.Dispatch<React.SetStateAction<boolean>>;
//   onBlogDeleteByAdmin?: { (deletedBlog: BlogType): void };
// };

// const BlogModal =({
//     blogArticle,
//     setBlogArticle,
//     show,
//     setShow,
//     onBlogDeleteByAdmin,
// }: BlogModalProps)=> {
//   const { blog, setBlog } = useBlog();
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const { currentUser } = useAuth();
//   const axiosPrivate = useAxiosPrivate();

//   // const blogKeysList = Object.keys(blogKeys);

//   const handleCancelBlog = async () => {
//     if (blogArticle) {
//       try {
//         // Vérifier si l'utilisateur actuel est un administrateur
        
//         const response: AxiosResponse = await axiosPrivate.delete(
//           `/blog/${blog.id}`
//         );
//         console.log('Annulation Event - Response : ', response.data);
//         setSuccessMessage(
//           'Evènement annulé. Redirection automatique. A bientôt !'
//         );
//         // onBlogDeleteByAdmin && onBlogDeleteByAdmin(blogArticle);
//         // const remainingBlog = blogArticle.filter(
//         //   (blogDeLaList) => blogDeLaList.id !== blog.id
//         // );

//         // On met à jour le state des events pour lancer un rerender du dashboard et avoir la liste rafraichie des events
//         setEvents(remainingEvents);
//         setTimeout(() => {
//           setEvent(undefined);
//           setSuccessMessage('');
//         }, 3000);
//       } catch (error) {
//         console.log('Annulation Event - Error : ', error);
//         setErrorMessage(
//           'Une erreur est survenue. Veuillez réessayer plus tard.'
//         );
//         setTimeout(() => {
//           setErrorMessage('');
//         }, 3000);
//       }
//     }
//   };
// };

// export default BlogModal;
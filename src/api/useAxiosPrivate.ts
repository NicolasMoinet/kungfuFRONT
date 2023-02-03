import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DecodedTokenType } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { axiosPrivate } from './axios';

const useAxiosPrivate = () => {
  const navigate = useNavigate();
  const { handleToast } = useToast();

  // On peut considérer les axios interceptor comme des eventListener. Quand on en déclenche un (dans un useEffect), il faut penser à retirer cet "eventListener" pour ne pas qu'il continue à se déclencher en continu
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    let isTokenExpired = false;

    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        // S'il n'y a pas déjà un Bearer token dans la propriété authorization des headers de la request, on l'ajoute après l'avoir récupéré dans le localstorage.
        if (config.headers && !config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
          console.log('AxiosPrivate - Request - Bearer token ajouté');
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      // Si la réponse est bonne, on la return simplement
      (response) => response,
      // S'il y a une erreur (pas de token ou token expiré par exemple), on ajoute une logique
      async (error) => {
        // On test si le token est expiré pour personnaliser le message
        if (accessToken) {
          const decodedToken: DecodedTokenType = jwtDecode(accessToken);

          const { exp } = decodedToken;
          isTokenExpired = exp - Date.now() / 1000 < 0;
          console.log('AxiosPrivate - Response- jwt expiré ? ', isTokenExpired);
        }

        // On récupère d'abord l'ancienne request faite
        const prevRequest = error?.config;
        // On vérifie en plus si la propriété sent de l'ancienne requête est false, c'est à dire si c'est la première fois que l'on reçoit cette request, cela permet d'éviter d'avoir une boucle infinie de request et c'est pour ça qu'on la passe à true dès qu'on gère cette erreur.
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          console.log(
            'AxiosPrivate - Response - token expiré : ',
            isTokenExpired
          );
          console.log('AxiosPrivate - Response - Erreur 401 : ', error);
          prevRequest.sent = true;
          handleToast({
            message: `Vous devez vous ${
              isTokenExpired ? 're' : ''
            }connecter pour effectuer cette action`,
            color: 'warning',
            delay: 3000,
          });
          navigate('/connexion');
          return axiosPrivate(prevRequest);
        }

        // Pour vérifier si le rôle autorise l'action
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          console.log('AxiosPrivate - Response - Erreur 403 : ', error);
          prevRequest.sent = true;
          handleToast({
            message:
              "Vous n'avez pas les autorisations pour effectuer cette action",
            color: 'warning',
            delay: 3000,
          });
          //   navigate('/connexion');
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    // Fonction qui clean ("retire") l'interceptor
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [handleToast, navigate]);

  return axiosPrivate;
};

export default useAxiosPrivate;

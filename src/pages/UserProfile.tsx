import { Container } from 'react-bootstrap';
import ProfileInput from '../components/ProfileInput';
import { useAuth } from '../context/AuthContext';
import './UserProfile.css';

// Permet d'avoir accès au nom de la propriété en français + capitalized pour l'afficher dans les champs du profil
export const userProfileKeys = {
  email: 'Email',
  password: 'Mot de passe',
  name: 'Pseudo',
  description: 'Description',
  
};

const UserProfile = () => {
  // On récupère, depuis le context, le user connecté pour accéder à toutes ses informations
  const { currentUser } = useAuth();

  // Cette méthode permet de récupérer un tableau avec la liste des clés utiles de User sous forme de string qui seront utilisées pour accéder aux valeurs des propriétés du user récupéré dans le useState
  const userKeys = Object.keys(userProfileKeys);

  return (
    <Container className='container'>
      {currentUser && (
        <>
          <h2 className='header'>Bonjour {currentUser.name}</h2>
          <section className='section'>
            <h3 className='account-header mb-4'>Compte</h3>
            {userKeys &&
              userKeys.map((userKey, i) => (
                // On envoie à l'enfant ProfileInput les props : user récupéré + la clé sur laquelle on est en train de loop avec map
                <ProfileInput key={i} user={currentUser} userKey={userKey} />
              ))}
          </section>
          
        </>
      )}
    </Container>
  );
};

export default UserProfile;

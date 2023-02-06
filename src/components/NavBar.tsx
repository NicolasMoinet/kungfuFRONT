import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { faCalendarPlus, faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faBlog,
  faLeaf,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './NavBar.css';

function NavBar() {
  // On récupère, depuis le context, la fonction de logout pour l'attacher à l'icône correspondante
  const { handleLogout } = useAuth();

  //TODO : Ajouter le Hover sur les icones
  return (
    <Navbar fixed='top' className='navbar-main'>
      <Nav className='nav-link-container'>
        <Link to={'/'} className='boxicon'>
          <div className='nav-link'>
            <FontAwesomeIcon icon={faLeaf} color={'white'} className='iconNB' />
          </div>
        </Link>

        <Link to={'/user/interface'} className='boxicon'>
          <div className='nav-link nav-icon'>
            <FontAwesomeIcon icon={faUser} color={'white'} className='iconNB' />
          </div>
        </Link>
        <Link to={'/Recherche'} className='boxicon'>
          <div className='nav-link'>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              color={'white'}
              className='iconNB'
            />
          </div>
        </Link>
        <Link to={'/Organiser'} className='boxicon'>
          <div className='nav-link'>
            <FontAwesomeIcon
              icon={faCalendarPlus}
              color={'white'}
              className='iconNB'
            />
          </div>
        </Link>
        <Link to={'/Organiser'} className='boxicon'>
          <div className='nav-link'>
            <FontAwesomeIcon icon={faBlog} color={'white'} className='iconNB' />
          </div>
        </Link>
        <Link to={'/connexion'} className='boxicon'>
          <div className='nav-link'>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              onClick={handleLogout}
              color={'white'}
              className='iconNB'
            />
          </div>
        </Link>
      </Nav>
    </Navbar>
  );
}

export default NavBar;

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
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
    <Navbar fixed='bottom' className='navbar-main'>
      <Link to={'/'}>
        <img src='/assets/Logo.png' alt='logo' className='logo' />
      </Link>
      <Nav className='nav-link-container'>
        <Link to={'/user/interface'} className='boxicon'>
          <div className='nav-link nav-icon'>
            <FontAwesomeIcon
              icon={faHouse}
              color={'black'}
              className='iconNB'
            />
          </div>
        </Link>
        <Link to={'/Recherche'} className='boxicon'>
          <div className='nav-link'>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              color={'black'}
              className='iconNB'
            />
          </div>
        </Link>
        <Link to={'/Organiser'} className='boxicon'>
          <div className='nav-link'>
            <FontAwesomeIcon
              icon={faCalendarPlus}
              color={'black'}
              className='iconNB'
            />
          </div>
        </Link>
        <Link to={'/Faq'} className='boxicon'>
          <div className='nav-link'>
            <FontAwesomeIcon
              icon={faCircleQuestion}
              color={'black'}
              className='iconNB'
            />
          </div>
        </Link>
        <Link to={'/connexion'} className='boxicon'>
          <div className='nav-link'>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              onClick={handleLogout}
              color={'black'}
              className='iconNB'
            />
          </div>
        </Link>
      </Nav>
    </Navbar>
  );
}

export default NavBar;

import './Header.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='headerLP'>
      <div className='buttonContainer'>
        <Link to={'/connexion'}>
          <Button className='button-Sign-Log' type='submit'>
            Connexion
          </Button>
        </Link>

        <Link to={'/inscription'}>
          <Button className='button-Sign-Log' type='submit'>
            Inscription
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;

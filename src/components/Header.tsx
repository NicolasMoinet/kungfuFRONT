import './Header.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='headerLP'>
      <div className='buttonContainer'>
        <Link to={'/connexion'}>
          <Button className='custom-btn btn-9' type='submit'>
            Connexion
          </Button>
        </Link>

        <Link to={'/inscription'}>
          <Button className='custom-btn btn-9' type='submit'>
            Inscription
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;

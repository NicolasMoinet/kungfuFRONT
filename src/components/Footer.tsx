import React from 'react';
// import { MDBFooter } from 'mdbreact';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // <MDBFooter className='footerBOX font-small pt-0 '>
    // <div className='footer-basic'>
    <footer className='footer-basic'>
      <ul className='list-inline'>
        <Link to={'/'}>
          <li className='list-inline-item'>Home</li>
        </Link>
        <li className='list-inline-item'>
          <a href='https://github.com/NicolasMoinet/kungfufront'>Github Lien</a>
        </li>

        <Link to={'/formulairecontact'}>
          <li className='list-inline-item'>Contact</li>
        </Link>

        <li className='list-inline-item'>
          <a href='https://www.facebook.com/jacky.juste'>Facebook</a>
        </li>
      </ul>
      <p className='copyright'>Xiong Ying Wushu Guan © 2023</p>
    </footer>
    // </div>
    // </MDBFooter>
  );
};

export default Footer;

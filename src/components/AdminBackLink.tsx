import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AdminBackLink.css';

const AdminBackLink = () => {
  return (
    <>
      <Link to={'/admin'}>
        <Button className='custom-btn btn-9'>Admin</Button>
      </Link>
    </>
  );
};

export default AdminBackLink;

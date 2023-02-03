import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AdminBackLink.css';

const AdminBackLink = () => {
  return (
    <>
      <Link to={'/admin'}>
        <Button className='my-3 admin-link'>Page Admin</Button>
      </Link>
    </>
  );
};

export default AdminBackLink;

import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AdminBackLink.css';

const AdminBackLink = () => {
  return (
    <div className='fond'>
      <Link to={'/admin'}>
        <Button className='custom-btn btn-9'>Admin</Button>
      </Link>
    </div>
  );
};

export default AdminBackLink;

import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () =>
  <div className="container text-center">
    <h1>404 page not found</h1>
    <p className="lead">We are sorry but the page you are looking for was moved, removed, renamed or might never existed.</p>
    <p><Link to="/" className="btn btn-lg btn-success">Bring me back home</Link></p>
  </div>

export default NotFoundPage;
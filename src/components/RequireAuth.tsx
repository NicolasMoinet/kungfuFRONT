import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface RequireAuthProps {
  // props dans laquelle on spécifie quels rôles seront autorisés à accéder à ces routes
  allowedRole: string[];
}

const RequireAuth = ({ allowedRole }: RequireAuthProps) => {
  const { currentUser, authLoading } = useAuth();
  const location = useLocation();

  // Si l'authentification est en cours, on affiche un message
  if (authLoading) {
    console.log('RequireAuth - loading');
    return <h2>Loading...</h2>;
  }

  // Si l'authentification est terminée, on vérifie le type de currentUser que l'on a
  if (currentUser?.role && allowedRole.includes(currentUser.role)) {
    console.log('RequireAuth - role ok : ', currentUser);
    return <Outlet />;
  } else {
    console.log('RequireAuth - role pas ok : ', currentUser);
    return <Navigate to='/connexion' state={{ from: location }} replace />;
  }

  //   return currentUser?.role && allowedRole.includes(currentUser.role) ? (
  //     <Outlet />
  //   ) : (
  //     <Navigate to='/connexion' state={{ from: location }} replace />
  //   );
};

export default RequireAuth;

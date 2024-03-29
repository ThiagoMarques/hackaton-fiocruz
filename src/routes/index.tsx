import React from 'react';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';
import { useAuth } from '../context/AuthContext';

export const Routes: React.FunctionComponent = () => {
  const { user, programData } = useAuth();
  console.log('programData', programData);
  if (!user?.uid) {
    return <AuthRoutes />;
  }
  return (
    <>
      <AppRoutes />
    </>
  );
};

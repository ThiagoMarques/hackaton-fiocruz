import React from 'react';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';
import { useAuth } from '../context/AuthContext';
import { ProgramProvider, useProgram } from '../context/ProgramsContext';

export const Routes: React.FunctionComponent = () => {
  const { user } = useAuth();
  const { programData } = useProgram();
  console.log('programData', programData);
  if (!user?.uid) {
    return <AuthRoutes />;
  }
  return (
    <>
      <ProgramProvider>
        <AppRoutes />
      </ProgramProvider>
    </>
  );
};

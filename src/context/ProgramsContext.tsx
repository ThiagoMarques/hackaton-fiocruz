import React from 'react';
import { useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useAuth } from './AuthContext';

interface IProgramsContext {
  programData: any;
  getPrograms(programName: string): Promise<any>;
}

interface IProps {
  children: React.ReactElement;
}

export const ProgramContext = React.createContext<IProgramsContext>(
  {} as IProgramsContext,
);

export const ProgramProvider: React.FunctionComponent<IProps> = ({
  children,
}) => {
  const { user } = useAuth();
  const [programData, setProgramData] = useState<any>(null);

  const authContext = useAuth();
  console.log('authContext.db', authContext.db);


  async function getPrograms(programName: string) {
    try {
      const db = await getFirestore(authContext.db);
      console.log('🚀 ~ getPrograms ~ db:', db);
      const querySnapshot = await getDocs(collection(db, 'programs'));
      let program = {};

      for (const doc of querySnapshot.docs) {
        const programs = doc.data();
        if (programs.id === programName) {
          program = JSON.parse(JSON.stringify(doc.data()));
        }
      }
      if (program) {
        setProgramData(program);
      }
    } catch (error) {
      console.error('Erro ao buscar programa:', error);
      return null;
    }
  }

  return (
    <ProgramContext.Provider
      value={{
        programData,
        getPrograms,
      }}
    >
      {children}
    </ProgramContext.Provider>
  );
};

export const useProgram = () => {
  const context = React.useContext(ProgramContext);

  if (!context) {
    throw new Error('useProgram deve ser usado em ProgramProvider');
  }

  return context;
};

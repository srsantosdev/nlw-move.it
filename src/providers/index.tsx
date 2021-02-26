import React from 'react';

import { ChallengesProvider } from './challenges';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ChallengesProvider>
      {children}
    </ChallengesProvider>
  )
}

export default AppProvider;
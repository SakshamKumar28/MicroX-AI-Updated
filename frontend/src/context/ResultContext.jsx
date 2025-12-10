import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
  const [currentResult, setCurrentResult] = useState(null);
  const [currentSlideId, setCurrentSlideId] = useState(null);

  return (
    <ResultContext.Provider 
      value={{ 
        currentResult, 
        setCurrentResult, 
        currentSlideId, 
        setCurrentSlideId,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResult = () => {
  const context = useContext(ResultContext);
  if (context === undefined) {
    throw new Error('useResult must be used within a ResultProvider');
  }
  return context;
};

import React, { createContext, useState, useContext, ReactNode } from 'react';
interface CountContextProps {
  count: number;
  updateCount: (newCount: number) => void;
}

const defaultContextValue: CountContextProps = {
  count: 0,
  updateCount: () => {},
};

const CountContext = createContext<CountContextProps>(defaultContextValue);

export const useCount = () => {

  return useContext(CountContext);
};
export const CountProvider = ({ children }: { children: ReactNode }) => 
{

  const [count, setCount] = useState<number>(() => {
    const storedCount = localStorage.getItem('count');
    return storedCount ? JSON.parse(storedCount) : 0;
  });

  const updateCount = (newCount: number) => {
    //sepete her ürün eklenip çıkarıldığında method sepetcountı alıp gelecek
    localStorage.setItem('count', JSON.stringify(newCount));
    
    setCount(newCount);
  };

  const contextValue: CountContextProps = {
    count,
    updateCount,
  };

  return (
    <CountContext.Provider value={contextValue}>
      {children}
    </CountContext.Provider>
  );
};

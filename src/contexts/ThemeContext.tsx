import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const Context = createContext(1);

export const useThemeContext = () => useContext(Context);



export default function ThemeContext( children: any ) {

const s="1"
  return <Context.Provider value={1}> {children}</Context.Provider>;
}

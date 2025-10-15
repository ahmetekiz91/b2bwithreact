import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface UserPageProps {
  children: any;
}

const AppLayout : React.FC<UserPageProps> = ({ children }) =>{
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default AppLayout;
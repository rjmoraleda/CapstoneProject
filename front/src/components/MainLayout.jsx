import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './components.css';
import ScrollToTopButton from './ScrollToTopButton';
const MainLayout = ({ children }) => {
  return (
    <div className="mainLayout">
      <Header />
      {children}
      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default MainLayout;

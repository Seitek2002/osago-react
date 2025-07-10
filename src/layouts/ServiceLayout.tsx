import React from 'react';
import Header from '../components/Header';

const ServiceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header type='services' />
      {children}
    </div>
  );
};

export default ServiceLayout;

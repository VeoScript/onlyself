import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-full w-full cursor-default flex-col items-center font-poppins">
      {children}
    </div>
  );
};

export default MainLayout;

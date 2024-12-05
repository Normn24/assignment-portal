import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#181818] text-white py-4 shadow-lg shadow-[#58bc82]">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Assignment Submission Portal</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-[#181818] text-white py-4 shadow-lg shadow-[#58bc82]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2024 Assignment Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

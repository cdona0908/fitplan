import React from 'react';


const Header = () => {
  const navigate = useNavigate()
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <h1>FitPlan</h1>
      </div>
    </header>
  );
};

export default Header;
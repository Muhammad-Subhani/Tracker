import { useState } from 'react';
import { Slidebar } from './components/layout/slidebar.jsx';
import './styles/Dashboard.css';
import { MainPage } from './MainContent.jsx';
export const Dashboard = function() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSlidebar = () => setIsOpen(prev => !prev);

  return (
    <div className="dashboard">
      <Slidebar isOpen={isOpen} toggleSlidebar={toggleSlidebar} />
      <div className={`main-content ${isOpen ? 'shifted' : ''}`}>
        <MainPage />
      </div>
    </div>
  );
}


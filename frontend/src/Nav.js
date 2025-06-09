import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Nav() {
  const [active, setActive] = useState('Home');
  const navigate = useNavigate(); 
  const navItems = [
    { name: 'Home', path: '/Home' },
    { name: 'About', path: '/about' },
    { name: 'Academic', path: '/academic' },
    { name: 'Admission', path: '/admission' },
    { name: 'Events and News', path: '/events-news' },
    { name: 'Alumni Network', path: '/alumni-network' },
  ];

  const handleNavigation = (item) => {
    setActive(item.name);
    navigate(item.path); 
  };

  return (
    <nav className="p-4">
      <ul className="flex flex-wrap justify-center space-x-6">
        {navItems.map((item) => (
          <li key={item.name}>
            <button
              onClick={() => handleNavigation(item)}
              className={`text-white px-3 py-2 transition-all duration-200 ${
                active === item.name
                  ? 'underline decoration-cyan-500 underline-offset-4'
                  : ''
              }`}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

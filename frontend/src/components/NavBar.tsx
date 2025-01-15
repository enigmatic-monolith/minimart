import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

type NavBarProps = {
  position: 'top' | 'bottom';
  active?: string; // Active page indicator for small screens
};

const NavBar: React.FC<NavBarProps> = ({ position, active }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠', route: '/' },
    { id: 'cart', label: 'Cart', icon: '🛒', route: '/cart' },
    { id: 'profile', label: 'Profile', icon: '👤', route: '/profile' },
  ];

  return (
    <nav className='navbar'>
      {navItems.map((item) => (
        <Link
          key={item.id}
          to={item.route}
          className='navItem'/*{`${styles.navItem} ${active === item.id ? styles.active : ''}`}*/
        >
          <span>{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;

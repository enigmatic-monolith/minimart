import React from 'react';
// import styles from './Navbar.css';

type NavbarProps = {
  position: 'top' | 'bottom';
  active?: string; // Active page indicator for small screens
};

const Navbar: React.FC<NavbarProps> = ({ position, active }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'cart', label: 'Cart', icon: '🛒' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <nav className=''/*{`${styles.navbar} ${styles[position]}`}*/>
      {navItems.map((item) => (
        <div
          key={item.id}
          className=''/*{`${styles.navItem} ${active === item.id ? styles.active : ''}`}*/
        >
          <span>{item.icon}</span>
          {item.label}
        </div>
      ))}
    </nav>
  );
};

export default Navbar;

import { FC } from 'react';
import Link from 'next/link';
import styles from '@/styles/Dashboard.module.css';

const Sidebar: FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.brand}>
        <h2>Nakshatra Gyaan</h2>
      </div>
      
      <div className={styles.menu}>
        <div className={styles.menuTitle}>Main</div>
        <Link href="/admin" className={`${styles.menuItem} ${styles.active}`}>
          <i className="fas fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
        
        <div className={styles.menuTitle}>Management</div>
        <Link href="/admin/users" className={styles.menuItem}>
          <i className="fas fa-users"></i>
          <span>User Management</span>
        </Link>
        {/* Add other menu items similarly */}
      </div>
    </div>
  );
};

export default Sidebar; 
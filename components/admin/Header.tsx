import { FC } from 'react';
import styles from '@/styles/Dashboard.module.css';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1>Dashboard</h1>
        <div className={styles.userInfo}>
          <span>Admin</span>
          <i className="fas fa-user-circle"></i>
        </div>
      </div>
    </header>
  );
};

export default Header; 
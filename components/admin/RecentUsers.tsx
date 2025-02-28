import { FC } from 'react';
import styles from '@/styles/Dashboard.module.css';

const RecentUsers: FC = () => {
  return (
    <div className={styles.recentUsers}>
      <h3>Recent Users</h3>
      <div className={styles.usersList}>
        <p>No recent users to display</p>
      </div>
    </div>
  );
};

export default RecentUsers; 
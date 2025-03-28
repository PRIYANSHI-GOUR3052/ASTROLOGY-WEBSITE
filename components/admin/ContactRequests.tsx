import { FC } from 'react';
import styles from '@/styles/Dashboard.module.css';

const ContactRequests: FC = () => {
  return (
    <div className={styles.contactRequests}>
      <h3>Contact Requests</h3>
      <div className={styles.requestsList}>
        <p>No contact requests to display</p>
      </div>
    </div>
  );
};

export default ContactRequests; 
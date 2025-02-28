import { FC } from 'react';
import styles from '@/styles/Dashboard.module.css';

const InventoryStatus: FC = () => {
  return (
    <div className={styles.inventoryStatus}>
      <h3>Inventory Status</h3>
      <div className={styles.inventoryList}>
        <div className={styles.inventoryItem}>
          <span>Digital Products</span>
          <span>0 items</span>
        </div>
        <div className={styles.inventoryItem}>
          <span>Physical Products</span>
          <span>0 items</span>
        </div>
        <div className={styles.inventoryItem}>
          <span>Services</span>
          <span>0 items</span>
        </div>
      </div>
    </div>
  );
};

export default InventoryStatus; 
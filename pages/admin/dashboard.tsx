import { FC, useEffect } from 'react';
import Head from 'next/head';
import styles from '@/styles/Dashboard.module.css';
import { useRouter } from 'next/router';

// Component imports
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import StatsContainer from '@/components/admin/StatsContainer';
import ChartsContainer from '@/components/admin/ChartsContainer';
import RecentUsers from '@/components/admin/RecentUsers';
import ContactRequests from '@/components/admin/ContactRequests';
import InventoryStatus from '@/components/admin/InventoryStatus';

const AdminDashboard: FC = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Nakshatra Gyaan - Admin Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </Head>

      <div className={styles.adminContainer}>
        <Sidebar />
        
        <div className={styles.mainContent}>
          <Header />
          <StatsContainer />
          <ChartsContainer />
          <RecentUsers />
          <ContactRequests />
          <InventoryStatus />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard; 
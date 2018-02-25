import React from 'react';
import { connect } from 'react-redux';

import styles from '../css/Dashboard';

const Dashboard = () => (
  <div className={styles.list}>
    <div className={styles.title}>Dashboard</div>

    <div className={styles.content}>This is a dashboard</div>
  </div>
);

const mapStateToProps = state => ({
  category: state.category,
  packages: state.packages,
});

export default connect(mapStateToProps)(Dashboard);

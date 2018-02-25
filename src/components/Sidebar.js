import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import styles from '../css/Sidebar';

const Sidebar = ({ path, dispatch }) => (
  <div className={styles.sidebar}>
    <Link to="/">Home</Link>

    <Link to="/dashboard">Dashboard</Link>
  </div>
);

const mapStateToProps = state => ({
  path: state.location.pathname,
});

export default connect(mapStateToProps)(Sidebar);

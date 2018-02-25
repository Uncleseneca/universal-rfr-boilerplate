import React from 'react';
import { connect } from 'react-redux';
import Link, { NavLink } from 'redux-first-router-link';

import styles from '../css/Sidebar';

const isActive = (actualPath, expectedPath) =>
  (actualPath === expectedPath ? styles.active : '');

const Sidebar = ({ path, dispatch }) => (
  <div className={styles.sidebar}>
    <h2>SEO-FRIENDLY LINKS</h2>

    <NavLink to="/" exact activeClassName={styles.active}>
      Home
    </NavLink>

    <NavLink
      activeClassName={styles.active}
      to={{ type: 'LIST', payload: { category: 'redux' } }}
    >
      Redux
    </NavLink>

    <Link
      className={isActive(path, '/list/react')}
      to={{ type: 'LIST', payload: { category: 'react' } }}
    >
      React
    </Link>

    <div style={{ height: 20 }} />
  </div>
);

const mapStateToProps = state => ({
  path: state.location.pathname,
});

export default connect(mapStateToProps)(Sidebar);

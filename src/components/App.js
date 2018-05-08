// @flow

import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as Screens from 'components/screens';
import * as Modules from 'components/modules';
import './index.css';
import styles from './app.css';

class App extends React.Component {
  render() {
    return (
      <div className={styles.app}>
        <Helmet>
          <title>Faster</title>
          <meta name="description" content="" />
        </Helmet>
        <Modules.Switcher />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  popup: state.popup,
});

export default connect(mapStateToProps)(App);

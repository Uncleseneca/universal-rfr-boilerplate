import React from 'react';
import * as reducers from 'reducers';

import Sidebar from './Sidebar';
import Switcher from './Switcher';

import styles from '../css/App';

const App = () => (
  <div className={styles.app}>
    <Sidebar />
    <Switcher />
  </div>
);

console.log(reducers);

export default App;

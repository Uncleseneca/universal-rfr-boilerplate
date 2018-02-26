import React from 'react';
import * as reducers from 'reducers';

import Sidebar from './Sidebar';
import Switcher from './Switcher';

const App = () => (
  <div>
    <Sidebar />
    <Switcher />
  </div>
);

console.log(reducers);

export default App;

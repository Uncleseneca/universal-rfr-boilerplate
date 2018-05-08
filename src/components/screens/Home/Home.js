import React from 'react';
import Link from 'redux-first-router-link';
// import * as Modules from 'components/modules';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home sweet home!</h1>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    );
  }
}

export default Home;

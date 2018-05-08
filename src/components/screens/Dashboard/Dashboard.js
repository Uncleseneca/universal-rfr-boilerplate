import React from 'react';
import Link from 'redux-first-router-link';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default Dashboard;

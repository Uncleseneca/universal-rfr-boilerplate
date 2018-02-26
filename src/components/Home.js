import React from 'react';
import styled from 'styled-components';

const Hi = styled.h2`
  color: blue;
  font-size: 34px;
`;

const Home = () => (
  <div>
    <h1>HOME</h1>
    <Hi>Hey pretty! Im styled!</Hi>
    <div>This is a home page</div>
  </div>
);

export default Home;

import React from 'react';
import styled from 'styled-components';
import styles from '../css/Home';

const Hi = styled.h2`
  color: blue;
  font-size: 34px;
`;

const Home = () => (
  <div className={styles.home}>
    <h1 className={styles.title}>HOME</h1>
    <Hi>Hey pretty! Im styled!</Hi>
    <div className={styles.content}>This is a home page</div>
  </div>
);

export default Home;

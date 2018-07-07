import React from 'react';
import { connect } from 'react-redux';
import universal from 'react-universal-component';

const UniversalComponent = universal(({ page }) =>
  import(`components/screens/${page}`));

const Switcher = ({ page }) => <UniversalComponent page={page} />; // eslint-disable-line react/prop-types

const mapStateToProps = ({ page }) => ({
  page,
});

export default connect(mapStateToProps)(Switcher);

import React from 'react';
import { connect } from 'react-redux';
import universal from 'react-universal-component';

const UniversalComponent = universal(({ page }) => import(`./${page}`), {
  minDelay: 500,

  loading: () => (
    <div>
      <div />
    </div>
  ),

  error: () => <div>PAGE NOT FOUND - 404</div>,
});

const Switcher = ({ page }) => (
  <div>
    <UniversalComponent page={page} />
  </div>
);

const mapStateToProps = state => ({
  page: state.page,
});

export default connect(mapStateToProps)(Switcher);

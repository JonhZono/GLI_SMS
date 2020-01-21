import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({
  component: Component,
  user: { isAuth, loading },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuth && !loading ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
};

PrivateRoute.propTypes = {};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);

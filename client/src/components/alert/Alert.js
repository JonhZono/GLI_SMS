import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Alert = ({ alerts, user }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div
      key={alert.id}
      className={`help is-${alert.alertType}`}
      style={{ fontSize: '1rem' }}
    >
      {user.success ? (
        <Fragment>
          {alert.msg}&nbsp; <i className='fas fa-check'></i>
        </Fragment>
      ) : (
        <Fragment>
          {alert.msg}&nbsp; <i className='fas fa-exclamation-triangle'></i>
        </Fragment>
      )}
    </div>
  ));

const mapStateToProps = state => ({
  alerts: state.alert,
  user: state.user
});
Alert.propTypes = {
  Alert: PropTypes.func.isRequired,
  Auth: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(Alert);

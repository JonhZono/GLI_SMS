import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ViewDetailsFee from './ViewDetailsFee';

import Spinner from '../../spinner/Spinner';
import UserLayout from '../../../hoc/User';
import { adminGetFeeById, clearFee } from '../../../actions/duefee';

class ViewEachFee extends Component {
  componentDidMount = () => {
    const fee_id = this.props.match.params.fee_id;
    this.props.dispatch(adminGetFeeById(fee_id));
  };
  componentWillUnmount = () => {
    this.props.dispatch(clearFee());
  };
  render() {
    return this.props.fee.individualFeeLists === null &&
      this.props.fee.loading ? (
      <UserLayout>
        <div
          className='column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile'
          style={{
            background: '#fcfcfc',
            paddingLeft: 30,
            paddingRight: 50,
            paddingTop: 30,
            paddingBottom: 30,
            marginTop: 40
          }}
        >
          <div className='py-1'>
            <h1
              style={{
                fontSize: 20,
                paddingBottom: '1rem'
              }}
            >
              Monthly Fee
            </h1>
            <div className='columns'>
              <div className='column'>
                <div className='card has-text-centered'>
                  <header className='card-header'>
                    <p
                      className='card-header-title'
                      style={{
                        backgroundColor: 'whitesmoke'
                      }}
                    >
                      Monthly Fee
                    </p>
                  </header>
                  <Spinner />
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    ) : (
      <UserLayout>
        <div
          className='column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile'
          style={{
            background: '#fcfcfc',
            paddingLeft: 30,
            paddingRight: 50,
            paddingTop: 30,
            paddingBottom: 30,
            marginTop: 40
          }}
        >
          <div className='py-1'>
            <h1
              style={{
                fontSize: 20,
                paddingBottom: '1rem'
              }}
            >
              Monthly Fee
            </h1>
            <div className='columns'>
              <div className='column'>
                <div className='card has-text-centered'>
                  <header className='card-header'>
                    <p
                      className='card-header-title'
                      style={{
                        backgroundColor: 'whitesmoke'
                      }}
                    >
                      Due Fee Details
                    </p>
                  </header>
                  <div className='card'>
                    <div className='card-content'>
                      <ViewDetailsFee
                        studentFee={this.props.fee.individualFeeLists}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => ({
  fee: state.fee
});

export default connect(mapStateToProps)(withRouter(ViewEachFee));

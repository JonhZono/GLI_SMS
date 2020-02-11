import React, { Component } from 'react';
import { connect } from 'react-redux';
import { adminGetFeeById, clearFee } from '../../../actions/duefee';
import Spinner from '../../spinner/Spinner';
import UserLayout from '../../../hoc/User';
import EditFee from './EditFee';

class IndexFee extends Component {
  componentDidMount() {
    const match = this.props.match;
    this.props.dispatch(adminGetFeeById(match.params.fee_id));
  }
  componentWillUnmount = () => {
    this.props.dispatch(clearFee());
  };
  render() {
    return this.props.fee.individualFeeLists === null ? (
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
              Student Due Fee
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
                      Due Fee Information
                    </p>
                  </header>
                  <div className='card-content'>
                    <div className='card'>
                      <Spinner />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    ) : (
      <EditFee
        fee_id={this.props.match.params.fee_id}
        FeeById={this.props.fee.individualFeeLists}
        loading={this.props.fee.loading}
      />
    );
  }
}

const mapStateToProps = state => ({
  fee: state.fee
});
export default connect(mapStateToProps)(IndexFee);

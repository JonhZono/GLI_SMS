import React from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../../hoc/User';
import Spinner from '../../../spinner/Spinner';
import { studentDueFeeLists } from '../../../../actions/duefee';
import RenderFee from './RenderFee';

class DueFee extends React.Component {
  componentDidMount = () => {
    this.props.dispatch(studentDueFeeLists(this.props.match.params.fee_id));
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
              className='has-text-weight-bold'
            >
              <i class='fas fa-arrow-circle-right' />
              &nbsp;&nbsp;Due Fee
            </h1>
            <div className='columns'>
              <div className='column'>
                <div className='card has-text-centered'>
                  <header
                    className='card-header'
                    style={{
                      background: 'whitesmoke'
                    }}
                  >
                    <p className='card-header-title'>Fee Lists</p>
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
              className='has-text-weight-bold'
            >
              <i class='fas fa-arrow-circle-right' />
              &nbsp;&nbsp;Due Fee
            </h1>
            <div className='columns'>
              <div className='column'>
                <div className='card has-text-centered'>
                  <header
                    className='card-header'
                    style={{
                      background: 'whitesmoke'
                    }}
                  >
                    <p className='card-header-title'>Fee Lists</p>
                  </header>
                  <RenderFee studentFee={this.props.fee.individualFeeLists} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return { fee: state.fee };
};

export default connect(mapStateToProps)(DueFee);

import React from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../../hoc/User';
import Spinner from '../../../spinner/Spinner';
import { getStudentById } from '../../../../actions/profile';
import EditStudent from './EditStudent';

class EditStudentPopUp extends React.Component {
  componentDidMount = () => {
    this.props.dispatch(getStudentById(this.props.match.params.student_id));
  };

  render() {
    const profile = this.props.profile;
    console.log(profile.loading);
    return profile.getStudentById === null ? (
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
              <i className='fas fa-arrow-circle-right' />
              &nbsp;&nbsp;Configuration
            </h1>
            <div className='columns'>
              <div className='column'>
                <div className='card has-text-centered'>
                  <header
                    className='card-header'
                    style={{
                      background: '#004973'
                    }}
                  >
                    <p className='card-header-title has-text-light'>
                      List of Configuration
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
              className='has-text-weight-bold'
            >
              <i className='fas fa-arrow-circle-right' />
              &nbsp;&nbsp;Configuration
            </h1>
            <div className='columns'>
              <div className='column'>
                <div className='card has-text-centered'>
                  <header
                    className='card-header'
                    style={{
                      background: '#004973'
                    }}
                  >
                    <p className='card-header-title has-text-light'>
                      List of Configuration
                    </p>
                  </header>
                  {
                    <EditStudent
                      student={profile.getStudentById}
                      student_id={this.props.match.params.student_id}
                    />
                  }
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
  profile: state.profile
});

export default connect(mapStateToProps)(EditStudentPopUp);

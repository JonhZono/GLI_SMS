import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditStudent from './EditStudent';
import { getStudentProfileById } from '../../../actions/profile';
import Spinner from '../../spinner/Spinner';
import UserLayout from '../../../hoc/User';

class EditStudentProfile extends Component {
  componentDidMount() {
    const match = this.props.match;
    this.props.dispatch(getStudentProfileById(match.params.profile_id));
  }
  render() {
    return this.props.profile.studentProfileById === null ? (
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
                paddingBottom: '1rem',
                textDecoration: 'underline'
              }}
              className='has-text-weight-bold'
            >
              Student Profile
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
                      My Information
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
      <EditStudent
        profile_id={this.props.match.params.profile_id}
        studentProfile={this.props.profile.studentProfileById}
      />
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps)(EditStudentProfile);

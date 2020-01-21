import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import UserLayout from '../../../../hoc/User';
import Alert from '../../../alert/Alert';
import Spinner from '../../../spinner/Spinner';
import { getGradeById } from '../../../../actions/profile';
import EditGrade from './EditGrade';

class EditGradePopUp extends React.Component {
  componentDidMount = () => {
    this.props.dispatch(getGradeById(this.props.match.params.grade_id));
    console.log(this.props.profile.getGradeById);
  };

  render() {
    $(document).ready(function() {
      $('#showModal').click(function() {
        $('.modal').addClass('is-active');
      });

      $('.modal-close').click(function() {
        $('.modal').removeClass('is-active');
      });
      $('.toggler').on('click', function() {
        $('.menu-container').toggleClass('active');
      });
      $('.nav-toggler').on('click', function() {
        $('.navbar-toggler').toggleClass('is-active');
        $('.navbar-menu').toggleClass('is-active');
      });
    });

    const profile = this.props.profile;
    console.log(profile.loading);
    return profile.getGradeById === null ? (
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
                    <EditGrade
                      grade={profile.getGradeById}
                      grade_id={this.props.match.params.grade_id}
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

export default connect(mapStateToProps)(EditGradePopUp);

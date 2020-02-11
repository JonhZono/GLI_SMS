import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../../hoc/User';
import { getIndividualStudentReportById } from '../../../../actions/feedback';
import { getUserAuth } from '../../../../actions/user';
import Spinner from '../../../spinner/Spinner';
import RenderReportLists from './RenderReportLists';

const FeedbackReport = props => {
  useEffect(() => {
    props.getUserAuth();
    props.getIndividualStudentReportById(props.user.id);
  }, [getUserAuth, getIndividualStudentReportById]);

  return props.user.loading && props.feedback.individualFeedbackLists ? (
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
            &nbsp;&nbsp;Feedback Report
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
                  <p className='card-header-title'>
                    List of Feedback
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
            &nbsp;&nbsp;Feedback Report
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
                  <p className='card-header-title'>
                    List of Feedback
                  </p>
                </header>
                <div className='card'>
                  <div className='card-content'>
                    <RenderReportLists
                      feedbacks={props.feedback.individualFeedbackLists}
                      loading={props.feedback.loading}
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
};

const mapStateToProps = state => ({
  feedback: state.feedback,
  user: state.user
});

export default connect(mapStateToProps, {
  getUserAuth,
  getIndividualStudentReportById
})(FeedbackReport);

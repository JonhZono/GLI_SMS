import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../../hoc/User';
import { getIndividualStudentReportById } from '../../../../actions/feedback';
import Spinner from '../../../spinner/Spinner';
import RenderListsFeedback from './RenderListsFeedback';

const ViewFeedback = props => {
  useEffect(() => {
    props.getIndividualStudentReportById(props.match.params.report_id);
  }, [getIndividualStudentReportById]);
  const renderLists = () =>
    props.feedback.individualFeedbackLists.length > 0 ? (
      props.feedback.individualFeedbackLists.map(feedback => (
        <RenderListsFeedback key={feedback._id} {...feedback} />
      ))
    ) : (
      <Spinner />
    );

  return props.loading && props.feedback.individualFeedbackLists === null ? (
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
              <header
                className='card-header'
                style={{
                  backgroundColor: 'whitesmoke'
                }}
              >
                <p className='card-header-title'>Student Lists</p>
              </header>
              <Spinner />
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
                    backgroundColor: 'whitesmoke'
                  }}
                >
                  <p className='card-header-title'>Student Lists</p>
                </header>

                <table className='table is-bordered is-narrow is-hoverable is-fullwidth has-text-centered'>
                  <thead style={{ background: 'whitesmoke' }}>
                    <tr>
                      <th>LessonID (Year/Month/Day-Student)</th>
                      <th>Term Code</th>
                      <th>Created At</th>
                      <th>Available To</th>
                      <th>Sender</th>
                      <th>Receiver</th>
                    </tr>
                  </thead>
                  <tbody>{renderLists()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

const mapStateToProps = state => ({
  feedback: state.feedback
});

export default connect(mapStateToProps, { getIndividualStudentReportById })(
  ViewFeedback
);

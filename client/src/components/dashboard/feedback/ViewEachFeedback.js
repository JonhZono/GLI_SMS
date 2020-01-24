import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ViewDetailsFeedback from './ViewDetailsFeedback';
import {
  getStudentReportById,
  clearViewEachFeedback
} from '../../../actions/feedback';
import Spinner from '../../spinner/Spinner';
import UserLayout from '../../../hoc/User';

class ViewEachFeedback extends Component {
  componentDidMount = () => {
    const report_id = this.props.match.params.report_id;
    this.props.dispatch(getStudentReportById(report_id));
  };
  componentWillUnmount = () => {
    this.props.dispatch(clearViewEachFeedback());
  };
  render() {
    return this.props.feedback.getStudentReportById === null &&
      this.props.feedback.loading ? (
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
                      {this.props.feedback.getStudentReportById && (
                        <p>
                          {
                            this.props.feedback.getStudentReportById.ownerId
                              .name
                          }{' '}
                          Feedback
                        </p>
                      )}
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
                      {this.props.feedback.getStudentReportById && (
                        <p>
                          {
                            this.props.feedback.getStudentReportById.ownerId
                              .name
                          }{' '}
                          Feedback
                        </p>
                      )}
                    </p>
                  </header>
                  <div className='card'>
                    <div className='card-content'>
                      <ViewDetailsFeedback
                        studentFeedback={
                          this.props.feedback.getStudentReportById
                        }
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
  feedback: state.feedback
});

export default connect(mapStateToProps)(withRouter(ViewEachFeedback));

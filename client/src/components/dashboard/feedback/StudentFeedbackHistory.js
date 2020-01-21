import React from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../hoc/User';
import {
  adminGetOverallReport,
  clearViewEachFeedback
} from '../../../actions/feedback';
import Spinner from '../../spinner/Spinner';
import FeedbackLists from './FeedbackLists';
import StudentFeedback from './StudentFeedback';

class StudentFeedbackHistory extends React.Component {
  componentDidMount = () => {
    this.props.dispatch(adminGetOverallReport());
  };
  componentWillUnmount = () => {
    this.props.dispatch(clearViewEachFeedback());
  };
  render() {
    return this.props.feedback.adminGetOverallReport === null &&
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
              className='has-text-weight-bold'
            >
              <i class='fas fa-arrow-circle-right' />
              &nbsp;&nbsp;History
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
                    <p className='card-header-title'>List of Feedback</p>
                    <StudentFeedback />
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
              &nbsp;&nbsp;History
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
                    <p className='card-header-title'>List of Feedback</p>
                    <StudentFeedback />
                  </header>

                  <FeedbackLists
                    feedbacks={this.props.feedback.adminGetOverallReport}
                    loading={this.props.feedback.loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    );
  }
}

const mapStateTopProps = state => ({
  feedback: state.feedback
});

export default connect(mapStateTopProps)(StudentFeedbackHistory);

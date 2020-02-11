import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditStudentFeedback from './EditStudentFeedback';
import { getStudentReportById } from '../../../actions/feedback';
import Spinner from '../../spinner/Spinner';
import UserLayout from '../../../hoc/User';

class EditFeedback extends Component {
  componentDidMount() {
    const match = this.props.match;
    this.props.dispatch(getStudentReportById(match.params.report_id));
  }
  render() {
    return this.props.feedback.getStudentReportById === null ? (
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
              Feedback
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
      <EditStudentFeedback
        report_id={this.props.match.params.report_id}
        studentFeedback={this.props.feedback.getStudentReportById}
      />
    );
  }
}

const mapStateToProps = state => ({
  feedback: state.feedback
});
export default connect(mapStateToProps)(EditFeedback);

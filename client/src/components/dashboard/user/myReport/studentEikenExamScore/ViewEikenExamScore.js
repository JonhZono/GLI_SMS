import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../../../hoc/User';
import {
  getIndividualStudentEikenExamById,
  clearExam
} from '../../../../../actions/exam';
import Spinner from '../../../../spinner/Spinner';
import RenderListsEikenExamScore from './RenderListEikenExamScore';

class ViewEikenExamScore extends Component {
  componentDidMount = () => {
    this.props.dispatch(
      getIndividualStudentEikenExamById(this.props.match.params.exam_id)
    );
  };
  componentWillUnmount = () => {
    this.props.dispatch(clearExam());
  };
  renderLists = () =>
    this.props.exam.eikenExamByOwnerId.length > 0 ? (
      this.props.exam.eikenExamByOwnerId.map(report => (
        <RenderListsEikenExamScore key={report._id} {...report} />
      ))
    ) : (
      <Spinner />
    );
  render() {
    return this.props.exam.loading &&
      this.props.exam.eikenExamByOwnerId === null ? (
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
              &nbsp;&nbsp;Eiken Exam Score
            </h1>
            <div className='columns'>
              <div className='column'>
                <header
                  className='card-header'
                  style={{
                    backgroundColor: 'whitesmoke'
                  }}
                >
                  <p className='card-header-title'>Score Lists</p>
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
              &nbsp;&nbsp;Eiken Exam Score
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
                    <p className='card-header-title'>Score Lists</p>
                  </header>

                  <table className='table is-bordered is-narrow is-hoverable is-fullwidth has-text-centered'>
                    <thead style={{ background: 'whitesmoke' }}>
                      <tr>
                        <th>Created At</th>
                        <th>Student</th>
                        <th>Teacher</th>
                        <th>Exam Date</th>
                        <th>Exam Level</th>
                        <th>Listening</th>
                        <th>Attitude</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderLists()}</tbody>
                  </table>
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
  exam: state.exam
});

export default connect(mapStateToProps)(ViewEikenExamScore);

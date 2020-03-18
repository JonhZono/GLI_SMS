import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../../hoc/User';
import Spinner from '../../../spinner/Spinner';
import { getJuniorEikenExamScoreByStudentID } from '../../../../actions/exam';
import Chart from './Chart';

class IndexJuniorEikenExamScoreChart extends Component {
  componentDidMount = () => {
    const student_id = this.props.match.params.student_id;
    this.props.dispatch(getJuniorEikenExamScoreByStudentID(student_id));
  };

  render() {
    return this.props.exam.loading &&
      this.props.exam.everyoneJuniorEikenStudentExamByID === null ? (
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
              Junior Eiken Exam Score
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
                      Junior Eiken Exam Score
                    </p>
                  </header>
                  <div className='card-content'>
                    <div className='card'>
                      <Spinner />
                    </div>
                  </div>
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
              Eiken Exam Score
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
                      {this.props.exam.everyoneJuniorEikenStudentExamByID &&
                        this.props.exam.everyoneJuniorEikenStudentExamByID.ownerId
                          .name}{' '}
                      Information
                    </p>
                  </header>
                  <Chart
                    everyoneJuniorEikenStudentExamByID={
                      this.props.exam.everyoneJuniorEikenStudentExamByID
                    }
                    loading={this.props.exam.loading}
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

const mapStateToProps = state => ({
  exam: state.exam
});

export default connect(mapStateToProps)(IndexJuniorEikenExamScoreChart);

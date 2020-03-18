import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getJuniorEikenExamById, clearViewExam } from '../../../actions/exam';
import Spinner from '../../spinner/Spinner';
import UserLayout from '../../../hoc/User';
import EditExam from './EditExam';

class EditExamIndex extends Component {
  componentDidMount() {
    const match = this.props.match;
    this.props.dispatch(getJuniorEikenExamById(match.params.exam_id));
  }
  componentWillUnmount = () => {
    this.props.dispatch(clearViewExam());
  };
  render() {
    return this.props.exam.getJuniorEikenExamById === null ? (
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
                      className='card-header-title has-text-light'
                      style={{
                        backgroundColor: 'whitesmoke'
                      }}
                    >
                      My Information
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
      <EditExam
        exam_id={this.props.match.params.exam_id}
        studentJuniorEikenExamById={this.props.exam.getJuniorEikenExamById}
        loading={this.props.exam.loading}
      />
    );
  }
}

const mapStateToProps = state => ({
  exam: state.exam
});
export default connect(mapStateToProps)(EditExamIndex);

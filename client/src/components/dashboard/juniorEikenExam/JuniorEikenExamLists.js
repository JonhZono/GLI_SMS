import React, { Component } from 'react';
import $ from 'jquery';
import UserLayout from '../../../hoc/User';
import { connect } from 'react-redux';
import ExamTableListInfo from './ExamTableListInfo';
import { adminGetJuniorEikenExam, clearExam } from '../../../actions/exam';
import Spinner from '../../spinner/Spinner';
import CreateExam from './CreateExam';

class EikenExamLists extends Component {
  componentDidMount = () => {
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
    this.props.dispatch(adminGetJuniorEikenExam());
  };

  componentWillUnmount = () => {
    this.props.dispatch(clearExam());
  };

  render() {
    const exam = this.props.exam;
    return exam.loading && exam.juniorEikenExamLists === null ? (
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
              &nbsp;&nbsp; Junior Eiken Exam Score
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
                    <p className='card-header-title'>Junior Eiken Exam Lists</p>
                    <CreateExam
                      totalExam={this.props.exam.juniorEikenExamLists.length}
                    />
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
              <i className='fas fa-arrow-circle-right' />
              &nbsp;&nbsp; Junior Eiken Exam Score
            </h1>
            <div className='columns'>
              <div className='column'>
                <div className='card'>
                  <header
                    className='card-header'
                    style={{
                      backgroundColor: 'whitesmoke'
                    }}
                  >
                    <p className='card-header-title'>Junior Eiken Exam Lists</p>
                    <CreateExam
                      totalExam={this.props.exam.juniorEikenExamLists.length}
                    />
                  </header>
                  <ExamTableListInfo lists={this.props.exam.juniorEikenExamLists} />
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

export default connect(mapStateToProps)(EikenExamLists);

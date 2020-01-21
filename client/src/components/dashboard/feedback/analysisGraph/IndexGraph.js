import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../../hoc/User';
import Spinner from '../../../spinner/Spinner';
import { getAnalysisByStudentID } from '../../../../actions/analysis';
import Chart from './Chart';

class IndexDailyAnalysisChart extends Component {
  componentDidMount = () => {
    const student_id = this.props.match.params.student_id;
    this.props.dispatch(getAnalysisByStudentID(student_id));
  };

  render() {
    return this.props.analysis.loading &&
      this.props.analysis.everyoneStudentAnalysisByID === null ? (
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
              Student Analysis
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
              Student Analysis
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
                      {this.props.analysis.everyoneStudentAnalysisByID &&
                        this.props.analysis.everyoneStudentAnalysisByID.ownerId.name}{' '}
                      Information
                    </p>
                  </header>
                  <Chart
                    everyoneStudentAnalysisByID={
                      this.props.analysis.everyoneStudentAnalysisByID
                    }
                    loading={this.props.analysis.loading}
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
  analysis: state.analysis
});

export default connect(mapStateToProps)(IndexDailyAnalysisChart);

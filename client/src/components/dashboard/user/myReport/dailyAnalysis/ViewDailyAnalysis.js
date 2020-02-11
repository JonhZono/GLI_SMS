import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../../../hoc/User';
import {
  getIndividualStudentDailyAnalysisById,
  clearStatistic
} from '../../../../../actions/analysis';
import Spinner from '../../../../spinner/Spinner';
import RenderListsDailyAnalysis from './RenderListDailyAnalysis';

class ViewDailyAnalysis extends Component {
  componentDidMount = () => {
    this.props.dispatch(
      getIndividualStudentDailyAnalysisById(
        this.props.match.params.performance_id
      )
    );
  };
  componentWillUnmount = () => {
    this.props.dispatch(clearStatistic());
  };
  renderLists = () =>
    this.props.analysis.individualDailyAnalysisLists.length > 0 ? (
      this.props.analysis.individualDailyAnalysisLists.map(report => (
        <RenderListsDailyAnalysis key={report._id} {...report} />
      ))
    ) : (
      <Spinner />
    );
  render() {
    return this.props.analysis.loading &&
      this.props.analysis.individualDailyAnalysisLists === null ? (
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
              &nbsp;&nbsp;Monthly Performance
            </h1>
            <div className='columns'>
              <div className='column'>
                <header
                  className='card-header'
                  style={{
                    backgroundColor: 'whitesmoke'
                  }}
                >
                  <p className='card-header-title'>Monthly Performance Lists</p>
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
              &nbsp;&nbsp;Monthly Performance
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
                    <p className='card-header-title'>Monthly Performance Lists</p>
                  </header>

                  <table className='table is-bordered is-narrow is-hoverable is-fullwidth has-text-centered'>
                    <thead style={{ background: 'whitesmoke' }}>
                      <tr>
                        <th>Created At</th>
                        <th>Available To</th>
                        <th>Sent By</th>
                        <th>Speaking</th>
                        <th>活動</th>
                        <th>授業態度</th>
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
  analysis: state.analysis
});

export default connect(mapStateToProps)(ViewDailyAnalysis);

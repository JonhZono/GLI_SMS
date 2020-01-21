import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStatisticById, clearViewPerformance } from '../../../actions/analysis';
import Spinner from '../../spinner/Spinner';
import UserLayout from '../../../hoc/User';
import EditAnalyze from './EditAnalyze';

class EditAnalyzeIndex extends Component {
  componentDidMount() {
    const match = this.props.match;
    this.props.dispatch(getStatisticById(match.params.performance_id));
  }
  componentWillUnmount = () => {
    this.props.dispatch(clearViewPerformance());
  };
  render() {
    return this.props.analysis.getPerformanceById === null ? (
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
      <EditAnalyze
        performance_id={this.props.match.params.performance_id}
        studentPerformanceById={this.props.analysis.getPerformanceById}
        loading={this.props.analysis.loading}
      />
    );
  }
}

const mapStateToProps = state => ({
  analysis: state.analysis
});
export default connect(mapStateToProps)(EditAnalyzeIndex);

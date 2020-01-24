import React, { Component } from 'react';
import { connect } from 'react-redux';
import DisplayLine from './DisplayLine';
import Spinner from '../../../spinner/Spinner';
import { clearViewPerformance } from '../../../../actions/analysis';

class Chart extends Component {
  state = {
    chartData: {}
  };
  componentWillUnmount = () => {
    this.props.dispatch(clearViewPerformance());
  };
  componentDidMount = () => {
    const staffGetStudentPerformance = this.props.staffGetStudentPerformance;

    this.setState({
      chartData: {
        labels: [
          'Writing',
          'Reading',
          'Listening',
          'Speaking',
          'Participation',
          'Active',
          'Attitude'
        ],
        datasets: [
          {
            label: '# DCE',
            data: [
              staffGetStudentPerformance && staffGetStudentPerformance.writing,
              staffGetStudentPerformance && staffGetStudentPerformance.reading,
              staffGetStudentPerformance &&
                staffGetStudentPerformance.listening,
              staffGetStudentPerformance && staffGetStudentPerformance.speaking,
              staffGetStudentPerformance &&
                staffGetStudentPerformance.participation,
              staffGetStudentPerformance && staffGetStudentPerformance.active,
              staffGetStudentPerformance && staffGetStudentPerformance.attitude
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 1)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderWidth: 1
          }
        ]
      }
    });
  };

  render() {
    return this.props.loading &&
      this.props.staffGetStudentPerformance === null ? (
      <Spinner />
    ) : (
      <div className='card'>
        <header className='card-header has-text-grey'>
          <p className='card-header-title'>Student Daily Performance</p>
        </header>
        <div className='content'>
          <DisplayLine
            positionLegend='right'
            date={
              this.props.staffGetStudentPerformance &&
              this.props.staffGetStudentPerformance.date
            }
            chartData={this.state.chartData}
            student={this.props.staffGetStudentPerformance}
          />
        </div>
      </div>
    );
  }
}

export default connect()(Chart);

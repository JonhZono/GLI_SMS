import React, { Component } from 'react';
import { connect } from 'react-redux';
import DisplayLine from './DisplayLine';
import Spinner from '../../../spinner/Spinner';
import { clearViewPerformance } from '../../../../actions/analysis';

//get props from userDashboard
class Chart extends Component {
  state = {
    chartData: {}
  };
  componentWillUnmount = () => {
    this.props.dispatch(clearViewPerformance());
  };
  componentDidMount = () => {
    const adminGetStudentPerformance = this.props.adminGetStudentPerformance;

    this.setState({
      chartData: {
        labels: [
          'Writing',
          'Reading',
          'Listening',
          'Speaking',
          '出席率',
          '活動',
          '授業態度'
        ],
        datasets: [
          {
            label: 'Tracking',
            data: [
              adminGetStudentPerformance && adminGetStudentPerformance.writing,
              adminGetStudentPerformance && adminGetStudentPerformance.reading,
              adminGetStudentPerformance &&
                adminGetStudentPerformance.listening,
              adminGetStudentPerformance && adminGetStudentPerformance.speaking,
              adminGetStudentPerformance &&
                adminGetStudentPerformance.participation,
              adminGetStudentPerformance && adminGetStudentPerformance.active,
              adminGetStudentPerformance && adminGetStudentPerformance.attitude
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
      this.props.adminGetStudentPerformance === null ? (
      <Spinner />
    ) : (
      <div className='card'>
        <header className='card-header'>
          <p className='card-header-title has-text-grey'>
            Monthly Performance of Each Student
          </p>
        </header>
        <div className='content'>
          <DisplayLine
            positionLegend='right'
            date={
              this.props.adminGetStudentPerformance &&
              this.props.adminGetStudentPerformance.date
            }
            chartData={this.state.chartData}
            student={this.props.adminGetStudentPerformance}
          />
        </div>
      </div>
    );
  }
}

export default connect()(Chart);

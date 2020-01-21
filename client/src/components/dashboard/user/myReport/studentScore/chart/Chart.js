import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import DisplayChart from './DisplayChart';
import DisplayPie from './DisplayPie';
import DisplayLine from './DisplayLine';
import DisplayPolarArea from './DisplayPolarArea';
import Spinner from '../../../../../spinner/Spinner';
import { clearViewExam } from '../../../../../../actions/exam';
class Chart extends Component {
  state = {
    chartData: {}
  };
  componentWillUnmount = () => {
    this.props.dispatch(clearViewExam());
  };
  componentDidMount = () => {
    const examById = this.props.examById;

    this.setState({
      chartData: {
        labels: ['Writing', 'Reading', 'Listening', 'Speaking'],
        datasets: [
          {
            label: '# Exam Score Evaluation',
            data: [
              examById && examById.writing,
              examById && examById.reading,
              examById && examById.listening,
              examById && examById.speaking
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }
        ]
      }
    });
  };

  render() {
    return this.props.examById === null ? (
      <Spinner />
    ) : (
      <Fragment>
        <div className='columns'>
          <div className='column'>
            <div className='card-content'>
              <div className='card'>
                <DisplayChart
                  positionLegend='right'
                  date={this.props.examById.date}
                  chartData={this.state.chartData}
                  student={this.props.examById}
                />
              </div>
            </div>
          </div>

          <div className='column'>
            <div className='card-content'>
              <div className='card'>
                <DisplayPie
                  positionLegend='right'
                  chartData={this.state.chartData}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='columns'>
          <div className='column'>
            <div className='card-content'>
              <div className='card'>
                <DisplayPolarArea
                  positionLegend='right'
                  chartData={this.state.chartData}
                />
              </div>
            </div>
          </div>

          <div className='column'>
            <div className='card-content'>
              <div className='card'>
                <DisplayLine
                  positionLegend='right'
                  chartData={this.state.chartData}
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  analysis: state.analysis
});

export default connect(mapStateToProps)(Chart);

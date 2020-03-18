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
    const eikenExamById = this.props.eikenExamById;

    this.setState({
      chartData: {
        labels: ['Writing', 'Reading', 'Listening', 'Attitude', 'Q&A'],
        datasets: [
          {
            label: 'Eiken',
            data: [
              eikenExamById && eikenExamById.writing,
              eikenExamById && eikenExamById.reading,
              eikenExamById && eikenExamById.listening,
              eikenExamById && eikenExamById.attitude,
              eikenExamById && eikenExamById.qna
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(75, 192, 192, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }
        ]
      }
    });
  };

  render() {
    return this.props.eikenExamById === null ? (
      <Spinner />
    ) : (
      <Fragment>
        <div className='columns'>
          <div className='column'>
            <div className='card-content'>
              <div className='card'>
                <DisplayChart
                  positionLegend='right'
                  chartData={this.state.chartData}
                  student={this.props.eikenExamById}
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
                  student={this.props.eikenExamById}
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
                  student={this.props.eikenExamById}
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
                  student={this.props.eikenExamById}
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
  exam: state.exam
});

export default connect(mapStateToProps)(Chart);

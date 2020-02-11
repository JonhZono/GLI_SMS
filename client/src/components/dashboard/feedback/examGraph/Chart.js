import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import DisplayPie from './DisplayPie';
import DisplayPolarArea from './DisplayPolarArea';
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
    const everyoneStudentExamByID = this.props.everyoneStudentExamByID;

    this.setState({
      chartData: {
        labels: ['Writing', 'Reading', 'Listening', 'Speaking'],
        datasets: [
          {
            label: '# Daily Class Evaluation',
            data: [
              everyoneStudentExamByID && everyoneStudentExamByID.writing,
              everyoneStudentExamByID && everyoneStudentExamByID.reading,
              everyoneStudentExamByID && everyoneStudentExamByID.listening,
              everyoneStudentExamByID && everyoneStudentExamByID.speaking
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
    return this.props.everyoneStudentExamByID === null ? (
      <Spinner />
    ) : (
      <Fragment>
        <div className='columns'>
          <div className='column'>
            <div className='card-content'>
              <div className='card'>
                <DisplayPie
                  positionLegend='right'
                  chartData={this.state.chartData}
                  student={
                    this.props.everyoneStudentExamByID &&
                    this.props.everyoneStudentExamByID
                  }
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
                  student={
                    this.props.everyoneStudentExamByID &&
                    this.props.everyoneStudentExamByID
                  }
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

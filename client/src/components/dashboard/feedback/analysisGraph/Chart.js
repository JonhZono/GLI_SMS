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
    const everyoneStudentAnalysisByID = this.props.everyoneStudentAnalysisByID;

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
            label: '# Daily Class Evaluation',
            data: [
              everyoneStudentAnalysisByID &&
                everyoneStudentAnalysisByID.writing,
              everyoneStudentAnalysisByID &&
                everyoneStudentAnalysisByID.reading,
              everyoneStudentAnalysisByID &&
                everyoneStudentAnalysisByID.listening,
              everyoneStudentAnalysisByID &&
                everyoneStudentAnalysisByID.speaking,
              everyoneStudentAnalysisByID &&
                everyoneStudentAnalysisByID.participation,
              everyoneStudentAnalysisByID && everyoneStudentAnalysisByID.active,
              everyoneStudentAnalysisByID &&
                everyoneStudentAnalysisByID.attitude
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
    return this.props.everyoneStudentAnalysisByID === null ? (
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
                    this.props.everyoneStudentAnalysisByID &&
                    this.props.everyoneStudentAnalysisByID
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
                    this.props.everyoneStudentAnalysisByID &&
                    this.props.everyoneStudentAnalysisByID
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
  analysis: state.analysis
});

export default connect(mapStateToProps)(Chart);

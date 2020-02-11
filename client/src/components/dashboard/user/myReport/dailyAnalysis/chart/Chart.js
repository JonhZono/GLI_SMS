import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import DisplayChart from './DisplayChart';
import DisplayPie from './DisplayPie';
import DisplayLine from './DisplayLine';
import DisplayPolarArea from './DisplayPolarArea';
import Spinner from '../../../../../spinner/Spinner';
import { clearViewPerformance } from '../../../../../../actions/analysis';
class Chart extends Component {
  state = {
    chartData: {}
  };
  componentWillUnmount = () => {
    this.props.dispatch(clearViewPerformance());
  };
  componentDidMount = () => {
    const performanceById = this.props.performanceById;

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
              performanceById && performanceById.writing,
              performanceById && performanceById.reading,
              performanceById && performanceById.listening,
              performanceById && performanceById.speaking,
              performanceById && performanceById.participation,
              performanceById && performanceById.active,
              performanceById && performanceById.attitude
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
    return this.props.performanceById === null ? (
      <Spinner />
    ) : (
      <Fragment>
        <div className='columns'>
          <div className='column'>
            <div className='card-content'>
              <div className='card'>
                <DisplayChart
                  positionLegend='right'
                  date={this.props.performanceById.date}
                  chartData={this.state.chartData}
                  student={this.props.performanceById}
                />
              </div>
            </div>
          </div>

          <div className='column'>
            <div className='card-content'>
              <div className='card'>
                <DisplayPie
                  positionLegend='right'
                  date={this.props.performanceById.date}
                  chartData={this.state.chartData}
                  student={this.props.performanceById}
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
                  date={this.props.performanceById.date}
                  chartData={this.state.chartData}
                  student={this.props.performanceById}
                />
              </div>
            </div>
          </div>

          <div className='column'>
            <div className='card-content'>
              <div className='card'>
                <DisplayLine
                  positionLegend='right'
                  date={this.props.performanceById.date}
                  chartData={this.state.chartData}
                  student={this.props.performanceById}
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

import React from 'react';
import { Bar } from 'react-chartjs-2';
import Moment from 'react-moment';

const DisplayChart = props => {
  DisplayChart.defaultProps = {
    positionLegend: 'right'
  };
  console.log(<Moment format='YYYY-MM-DD'>{props.date}</Moment>);
  let date = <Moment format='yyyy-MM-dd'>{props.date}</Moment>;
  console.log(date);
  return (
    <Bar
      data={props.chartData}
      options={{
        title: {
          display: true,
          text: props.student.ownerId.name + ' Date ' + props.date,
          fontSize: '16'
        },
        legend: {
          display: true,
          position: props.positionLegend
        }
      }}
    />
  );
};

export default DisplayChart;

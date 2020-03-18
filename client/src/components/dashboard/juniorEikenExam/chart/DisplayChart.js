import React from 'react';
import { Bar } from 'react-chartjs-2';

const DisplayChart = props => {
  DisplayChart.defaultProps = {
    positionLegend: 'right'
  };

  return (
    <Bar
      data={props.chartData}
      options={{
        title: {
          display: true,
          text: props && props.student.name + ' Date ' + props.student.examDate,
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

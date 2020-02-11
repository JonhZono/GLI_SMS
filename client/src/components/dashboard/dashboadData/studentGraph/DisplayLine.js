import React from 'react';
import { Pie } from 'react-chartjs-2';

const DisplayLine = props => {
  DisplayLine.defaultProps = {
    positionLegend: 'right'
  };
  return (
    <Pie
      data={props.chartData}
      options={{
        title: {
          display: true,
          text:
            props.student &&
            props.student.name + ' Date ' + props.student.examDate,
          fontSize: '16'
        },
        legend: {
          display: true,
          position: 'right'
        }
      }}
    />
  );
};

export default DisplayLine;

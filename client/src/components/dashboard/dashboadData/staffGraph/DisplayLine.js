import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DisplayLine = props => {
  return (
    <Doughnut
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

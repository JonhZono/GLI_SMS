import React from 'react';
import { Line } from 'react-chartjs-2';

const DisplayLine = props => {
  return (
    <Line
      data={props.chartData}
      options={{
        title: {
          display: true,
          text: props.student.ownerId.name + ' Date ' + props.student.examDate,
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

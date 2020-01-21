import React from 'react';
import { Line } from 'react-chartjs-2';

const DisplayLine = props => {
  return (
    <Line
      data={props.chartData}
      options={{
        title: {
          display: true,
          text: 'Classroom Evaluation',
          fontSize: '18'
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

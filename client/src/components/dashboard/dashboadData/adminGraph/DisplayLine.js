import React from 'react';
import { Line } from 'react-chartjs-2';

const DisplayLine = props => {
  return (
    <Line
      data={props.chartData}
      options={{
        title: {
          display: true,
          text: props.student.ownerId && props.student.ownerId.name,
          fontSize: '14'
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

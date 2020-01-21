import React from 'react';
import { Pie } from 'react-chartjs-2';

const DisplayPie = props => {
  return (
    <Pie
      data={props.chartData}
      options={{
        title: {
          display: true,
          text:
            props.student &&
            props.student.ownerId.name + ' Date ' + props.student.date,
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

export default DisplayPie;

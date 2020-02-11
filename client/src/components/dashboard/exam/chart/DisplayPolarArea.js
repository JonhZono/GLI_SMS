import React from 'react';
import { Doughnut  } from 'react-chartjs-2';

const DisplayPolarArea = props => {
  return (
    <Doughnut 
      data={props.chartData}
      options={{
        title: {
          display: true,
          text: props && props.student.name + ' Date ' + props.student.examDate,
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

export default DisplayPolarArea;

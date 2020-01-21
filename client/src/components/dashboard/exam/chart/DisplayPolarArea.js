import React from 'react';
import { Doughnut  } from 'react-chartjs-2';

const DisplayPolarArea = props => {
  return (
    <Doughnut 
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

export default DisplayPolarArea;

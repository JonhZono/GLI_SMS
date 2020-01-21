import React from 'react';
import { Line } from 'react-chartjs-2';

const DisplayLine = props => {
  DisplayLine.defaultProps = {
    positionLegend: 'right'
  };
  return (
    <Line
      data={props.chartData}
      options={{
        title: {
          display: true,
          text:
            props.student && props.student.ownerId.name + ' Date ' + props.date,
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

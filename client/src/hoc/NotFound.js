import React from 'react';

const NotFound = () => {
  return (
    <div
      style={{
        display: 'table',
        width: '100%',
        height: '100vh',
        textAlign: 'center'
      }}
    >
      <div
        style={{
          display: 'table-cell',
          verticalAlign: 'middle'
        }}
      >
        <h1
          style={{
            fontSize: '50px',
            display: 'inline-block',
            paddingRight: '12px',
            animation: 'type .5s alternate infinite'
          }}
        >
          Error 404, Page Not Found!
        </h1>
      </div>
    </div>
  );
};

export default NotFound;

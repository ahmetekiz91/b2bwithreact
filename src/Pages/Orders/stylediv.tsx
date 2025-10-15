import React from 'react';

const stylediv: React.FC = () => {
  const divStyle: React.CSSProperties = {
    color: 'blue',
    backgroundColor: 'lightgray',
    padding: '10px',
    border: '1px solid black',
  };

  return <div style={divStyle}>Hello, inline styles in TypeScript!</div>;
};

export default stylediv;
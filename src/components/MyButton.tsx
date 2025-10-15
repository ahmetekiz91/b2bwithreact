import React from 'react';

const MyButton = () => {
  const buttonStyle = {
    backgroundColor: '#94a3b8',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '16px',
  };

  return (
    <div>
      <button style={buttonStyle}>Add button</button>
    </div>
  );
};

export default MyButton;
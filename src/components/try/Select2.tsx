import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const Select2 = () => {
  const options = [
    'Apple',
    'Banana',
    'Orange',
    'Pineapple',
    'Grapes',
    // ... Diğer seçenekler
  ];

  return (
    <div style={{ width: 300 }}>
      <Typeahead
        id="searchable-dropdown"
        labelKey="name"
        options={options}
        placeholder="Search for a fruit..."
      />
    </div>
  );
};

export default Select2;

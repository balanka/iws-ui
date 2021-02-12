import React from 'react';
import ReactDOM from 'react-dom';
import Tables2 from './Tables2'


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tables2 />, div);
  ReactDOM.unmountComponentAtNode(div);
});

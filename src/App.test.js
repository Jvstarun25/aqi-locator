import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('should render the Header and Dashboard components', () => {
    const { getByText } = render(<App />);
    
    // Check if Header contains the title text
    const headerText = getByText(/AQI Dashboard/i);
    expect(headerText).toBeInTheDocument();

    // Assuming Dashboard contains specific text, like "AQI Data"
    const dashboardText = getByText(/Current Air Quality Index/i);
    expect(dashboardText).toBeInTheDocument();
  });
});

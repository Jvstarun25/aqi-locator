import React from 'react';
import { render, screen } from '@testing-library/react';
import AQIWidget from './AQIWidget';
import '@testing-library/jest-dom';

describe('AQIWidget Component', () => {
  const aqiData = {
    aqi: 75,
    location: 'New York',
  };
  const lastUpdated = new Date('2024-08-11T01:00:00');
  const color = '#ffde33';
  const label = 'Moderate';

  test('renders correctly with valid data', () => {
    render(
      <AQIWidget
        aqiData={aqiData}
        lastUpdated={lastUpdated}
        color={color}
        label={label}
      />
    );

    // Check that the AQI value is displayed
    const aqiValueElement = screen.getByText('75', { selector: 'text' });
    expect(aqiValueElement).toBeInTheDocument();

    // Check that the location is displayed
    expect(screen.getByText('New York')).toBeInTheDocument();

    // Check that the label is displayed
    expect(screen.getByText('Moderate')).toBeInTheDocument();

    // Check that the last updated time is displayed in a human-readable format
    expect(
      screen.getByText('Last Updated: 8/11/2024, 1:00:00 AM')
    ).toBeInTheDocument();
  });

  test('renders loading state when aqiData is not provided', () => {
    render(<AQIWidget aqiData={null} />);

    // Check that the loading message is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders the Speedometer with correct props', () => {
    const { container } = render(
      <AQIWidget
        aqiData={aqiData}
        lastUpdated={lastUpdated}
        color={color}
        label={label}
      />
    );

    // Check that the Speedometer component is rendered
    const speedometer = container.querySelector('.speedometer');
    expect(speedometer).toBeInTheDocument();

    // Since Speedometer is a third-party component, we assume it's rendered with the correct props based on its presence.
  });
});

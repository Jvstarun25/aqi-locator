import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';
import '@testing-library/jest-dom';
import * as aqiService from '../api/aqiService';
import useAQIData from '../hooks/useAQIData';

// Mock the useAQIData hook and the getMultipleAQIData function
jest.mock('../hooks/useAQIData');
jest.mock('../api/aqiService');

describe('Dashboard Component', () => {
  const mockAqiData = [
    {
      location: 'My Location',
      aqi: 75,
      time: '2024-08-11 01:00:00',
      iaqi: {
        dew: { v: 12 },
        h: { v: 60 },
        p: { v: 1010 },
        pm25: { v: 35 },
        t: { v: 22 },
        w: { v: 3 },
        wg: { v: 5 },
      },
    },
  ];

  beforeEach(() => {
    useAQIData.mockReturnValue({
      aqiData: mockAqiData,
      lastUpdated: new Date(),
      refreshData: jest.fn(),
    });
  });

  test('renders Dashboard with correct text and structure', () => {
    render(<Dashboard />);

    // Check if the current air quality heading is rendered
    expect(screen.getByText(/Current Air Quality Index/i)).toBeInTheDocument();

    // Check if the Accordion is rendered with the correct title
    const accordionSummary = screen.getByText(/Location Options/i);
    expect(accordionSummary).toBeInTheDocument();

    // Check if the Refresh Data button is rendered
    const refreshButton = screen.getByRole('button', { name: /Refresh Data/i });
    expect(refreshButton).toBeInTheDocument();
  });

  test('calls refreshData function when Refresh Data button is clicked', () => {
    const mockRefreshData = jest.fn();
    useAQIData.mockReturnValue({
      aqiData: mockAqiData,
      lastUpdated: new Date(),
      refreshData: mockRefreshData,
    });

    render(<Dashboard />);

    // Click the Refresh Data button
    fireEvent.click(screen.getByRole('button', { name: /Refresh Data/i }));

    // Verify that the refreshData function was called
    expect(mockRefreshData).toHaveBeenCalled();
  });
});

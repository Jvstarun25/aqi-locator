import axios from 'axios';
import { getMultipleAQIData } from './aqiService';

// Mock axios
jest.mock('axios');

describe('getMultipleAQIData', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch AQI data for multiple locations successfully', async () => {
    // Mock responses for the locations
    const mockResponses = [
      { data: { data: { city: { name: 'New York' }, aqi: 23, time: { s: '2024-08-11 01:00:00' }, iaqi: {} } } },
      { data: { data: { city: { name: 'Los Angeles' }, aqi: 50, time: { s: '2024-08-11 02:00:00' }, iaqi: {} } } }
    ];

    // Mock axios.all to return the mock responses
    axios.all.mockResolvedValue(mockResponses);

    // Call the function
    const locations = [{ value: 'newyork', displayName: 'New York' }, { value: 'losangeles', displayName: 'Los Angeles' }];
    const result = await getMultipleAQIData(locations);

    // Expected result
    const expectedResult = [
      { location: 'New York', aqi: 23, time: '2024-08-11 01:00:00', iaqi: {} },
      { location: 'Los Angeles', aqi: 50, time: '2024-08-11 02:00:00', iaqi: {} }
    ];

    expect(result).toEqual(expectedResult);
    expect(axios.all).toHaveBeenCalledWith([
      axios.get('https://api.waqi.info/feed/newyork/', { params: { token: process.env.REACT_APP_WAQI_API_TOKEN } }),
      axios.get('https://api.waqi.info/feed/losangeles/', { params: { token: process.env.REACT_APP_WAQI_API_TOKEN } })
    ]);
  });

  it('should return an empty array if there is an error', async () => {
    // Mock axios.all to throw an error
    axios.all.mockRejectedValue(new Error('Network Error'));

    // Call the function
    const locations = [{ value: 'newyork', displayName: 'New York' }];
    const result = await getMultipleAQIData(locations);

    // Expected result
    expect(result).toEqual([]);
    expect(axios.all).toHaveBeenCalledWith([
      axios.get('https://api.waqi.info/feed/newyork/', { params: { token: process.env.REACT_APP_WAQI_API_TOKEN } })
    ]);
  });
  
  it('should handle incorrect token by returning an empty array', async () => {
    // Mock a response with an incorrect token
    const errorResponse = {
      response: {
        status: 401,
        data: { status: 'error', data: 'Invalid key' }
      }
    };

    // Mock axios.all to return a rejected promise with the specific error response
    axios.all.mockRejectedValue(errorResponse);

    // Call the function
    const locations = [{ value: 'newyork', displayName: 'New York' }];
    const result = await getMultipleAQIData(locations);

    // Expected result
    expect(result).toEqual([]);
    expect(axios.all).toHaveBeenCalledWith([
      axios.get('https://api.waqi.info/feed/newyork/', { params: { token: process.env.REACT_APP_WAQI_API_TOKEN } })
    ]);
  });
});
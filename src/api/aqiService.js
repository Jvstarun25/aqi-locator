import axios from 'axios';

// Fetch secret api token from env
const API_TOKEN = process.env.REACT_APP_WAQI_API_TOKEN;
const URL = "https://api.waqi.info/feed/";

/**
 * 
 * To make api call to fetch AQI details for multiple locations
 * @param {array} locations  e.g.: [{ value: "newyork", displayName: "New York" }]
 * @returns Array[{
    "location": "New York",
    "aqi": 23,
    "time": "2024-08-11 01:00:00",
    "iaqi": {}
    }] 
 */
export const getMultipleAQIData = async (locations) => {
    try {
      const requests = locations.map((location) =>
        axios.get(`${URL}${location?.value}/`, {
          params: {
            token: API_TOKEN,
          },
        })
      );
  
      const responses = await axios.all(requests);
  
      return responses.map((response) => ({
        location: response.data.data.city.name,
        aqi: response.data.data.aqi,
        time: response.data.data.time.s,
        iaqi: response.data.data.iaqi
      }));
    } catch (error) {
      console.error('Error fetching multiple AQI data:', error);
      return [];
    }
  };
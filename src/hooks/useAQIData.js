import { useState, useEffect } from 'react';
import { getMultipleAQIData } from '../api/aqiService';

/**
 * Hook to fetch and store AQI details
 * @param {array} locations Array containing each locations' deatils- value and displayName
 * @returns object  
 */
const useAQIData = ( locations ) => {
  const [ aqiData, setAQIData ] = useState([]);
  const [ lastUpdated, setLastUpdated ] = useState(null);

// Fetch new data when refresh button is clicked
  const refreshData = async () => {
        const data = await getMultipleAQIData(locations);
        console.log(data);
        setAQIData(data);
        setLastUpdated(new Date());
    };

// Fetch new data when page loads or is relaoded
  useEffect(() => {
    const fetchData = async () => {
      const data = await getMultipleAQIData(locations);
      setAQIData(data);
      setLastUpdated(new Date());
    };
    fetchData();
  }, []);

    return { aqiData, lastUpdated, refreshData };
};

export default useAQIData;

/**
 * 
 * @param {number} aqi aqi value
 * @returns String Hex color value corresponsing to the AQI value
 */
export const getColorForAQI = (aqi) => {
    if (aqi >= 0 && aqi <= 50) return '#009966'; // Good -Green
    else if (aqi >50 && aqi <= 100) return '#ffde33'; // Moderate-Yellow
    else if (aqi >100 && aqi <= 150) return '#ff9933'; // Unhealthy for Sensitive Groups-Orange
    else if (aqi >150 && aqi <= 200) return '#cc0033'; // Unhealthy-Red
    else if (aqi >200 &&  aqi <= 300) return '#660099'; // Very Unhealthy-Purple
    else return '#7e0023'; // Hazardous-Maroon
  };

/**
 * 
 * @param {number} aqi aqi value
 * @returns String Label i.e categorization corresponding to the AQI value
 */
export const getLabelForAQI = (aqi) => {
    if (aqi >= 0 && aqi <= 50) return 'Good';
    else if (aqi >50 && aqi <= 100) return 'Moderate';
    else if (aqi >100 && aqi <= 150) return 'Unhealthy for Sensitive Groups';
    else if (aqi >150 && aqi <= 200) return 'Unhealthy';
    else if (aqi >200 &&  aqi <= 300) return 'Very Unhealthy';
    else return 'Hazardous';
};


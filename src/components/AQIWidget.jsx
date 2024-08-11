import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import Speedometer from 'react-d3-speedometer';

/**
 * 
 * @param {object} aqiData array od objects holding AQI details of each city
 * @param {date} lastUpdated Date when the data was last fetched in human readable format
 * @param {string} color Color corresponding to selected city's AQI Value.
 * @param {string} label Categorization of selected city's AQI Value i.e Good, moderate, ... etc
 * @returns JSX
 */
const AQIWidget = ({ aqiData, lastUpdated, color, label}) => {
  if (!aqiData) return <div>Loading...</div>;

  return (
    <Card
            sx={{
                backgroundColor: '#f5f5f5',
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                boxShadow: 3,
                padding: 2,
                maxWidth: 400,
                margin: 'auto',
                textAlign: 'center'
            }}
        >
            <CardContent>
                <Speedometer
                   maxValue={400} // Set to accommodate values beyond 300
                   value={aqiData.aqi}
                   needleColor="red"
                   segments={6}
                   segmentColors={[
                       '#009966', // Good
                       '#ffde33', // Moderate
                       '#ff9933', // Unhealthy for Sensitive Groups
                       '#cc0033', // Unhealthy
                       '#660099', // Very Unhealthy
                       '#7e0023', // Hazardous
                   ]}
                   customSegmentStops={[0, 50, 100, 150, 200, 300, 400]}

                />
                <Typography variant="h4" color={color} gutterBottom>
                    {aqiData?.aqi}
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
                    {aqiData?.location}
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        color: color,
                        marginBottom: 1,
                    }}
                >
                    {label}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {/* Set Date in human Readable format */}
                    Last Updated: {lastUpdated.toLocaleString()} 
                </Typography>
            </CardContent>
        </Card>
  );
};

export default AQIWidget;

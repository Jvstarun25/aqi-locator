import React, { Fragment, useState } from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AQIWidget from '../components/AQIWidget';
import useAQIData from '../hooks/useAQIData';
import { getLabelForAQI, getColorForAQI } from '../utils/common';

/**
 * Dashboard Page
 * @returns JSX
 */
const Dashboard = () => {
    const [ currentLocation, setCurrentLocation] = useState({ index: 0, value: 'here'});
    const locations = [
        { displayValue: "My Location", value: 'here' },
        { displayValue: "New York", value: 'New York' },
        { displayValue: "Los Angeles", value: 'Los Angeles' },
        { displayValue: "Chicago", value: 'Chicago' }
    ];

    // Use the custom hook to fetch AQI data for the current location
    const { aqiData, lastUpdated, refreshData } = useAQIData(locations);

    const handleLocationChange = (location) => {
        setCurrentLocation(location);
    };

    return (
        <Fragment>
            <Typography variant="h6" component="div" margin={2} gutterBottom>
                Current Air Quality Index
            </Typography>
        
            <Box sx={{ display: 'flex', height: '100vh', padding: 2 }}>

                <Box sx={{ display: 'flex', flex: 3 }}>
                    <AQIWidget aqiData={aqiData?.[currentLocation['index']]} lastUpdated={lastUpdated} color={getColorForAQI(aqiData[currentLocation['index']]?.aqi)} label={getLabelForAQI(aqiData[currentLocation['index']]?.aqi)} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', margin: 'auto', flex: 3 }}>
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant="h6">Location Options</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {locations.map((location, index) => (
                                    <Accordion key={location?.value} expanded={ index === currentLocation.index} onClick={() => handleLocationChange({ index: index, value: location.value })}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={`${location?.value}-content`}
                                            id={`${location?.value}-header`}
                                            sx={index === currentLocation.index ? {
                                                backgroundColor: getColorForAQI(aqiData[currentLocation['index']]?.aqi)
                                            }: {}}
                                        >
                                            <Typography>{location?.displayValue}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start'}}>
                                            { aqiData[index]?.iaqi?.dew && <Typography> Dew: {aqiData[index]?.iaqi?.dew?.v}°C.</Typography> }
                                        
                                            { aqiData[index]?.iaqi?.h && <Typography> Relative humidity: { aqiData[index]?.iaqi?.h?.v }% </Typography> }
                                            { aqiData[index]?.iaqi?.p && <Typography> Atmospheric pressure: { aqiData[index]?.iaqi?.p?.v} hPa </Typography> }
                                            { aqiData[index]?.iaqi?.pm25 && <Typography> Concentration of Particulate Matter 2.5: { aqiData[index]?.iaqi?.pm25?.v } µg/m³ </Typography> }
                                            { aqiData[index]?.iaqi?.t && <Typography> Ambient temperature: { aqiData[index]?.iaqi?.t?.v }°C. </Typography> }
                                            { aqiData[index]?.iaqi?.w && <Typography> Wind speed: { aqiData[index]?.iaqi?.w?.v } m/s </Typography> }
                                            { aqiData[index]?.iaqi?.wg && <Typography> Wind gust: { aqiData[index]?.iaqi?.wg?.v } m/s </Typography> }
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                                <Button variant="outlined" color="secondary" onClick={() => { refreshData() }}>
                                    Refresh Data
                                </Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>
        </Fragment>
    );
};

export default Dashboard;

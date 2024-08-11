import { getColorForAQI, getLabelForAQI } from './common';

describe('getColorForAQI', () => {
  test('returns correct color for AQI values', () => {
    expect(getColorForAQI(0)).toBe('#009966'); // Edge case
    expect(getColorForAQI(50)).toBe('#009966'); // Boundary case
    expect(getColorForAQI(51)).toBe('#ffde33');
    expect(getColorForAQI(100)).toBe('#ffde33'); // Boundary case
    expect(getColorForAQI(101)).toBe('#ff9933');
    expect(getColorForAQI(150)).toBe('#ff9933'); // Boundary case
    expect(getColorForAQI(151)).toBe('#cc0033');
    expect(getColorForAQI(200)).toBe('#cc0033'); // Boundary case
    expect(getColorForAQI(201)).toBe('#660099');
    expect(getColorForAQI(300)).toBe('#660099'); // Boundary case
    expect(getColorForAQI(301)).toBe('#7e0023');
  });
});

describe('getLabelForAQI', () => {
  test('returns correct label for AQI values', () => {
    expect(getLabelForAQI(0)).toBe('Good'); // Edge case
    expect(getLabelForAQI(50)).toBe('Good'); // Boundary case
    expect(getLabelForAQI(51)).toBe('Moderate');
    expect(getLabelForAQI(100)).toBe('Moderate'); // Boundary case
    expect(getLabelForAQI(101)).toBe('Unhealthy for Sensitive Groups');
    expect(getLabelForAQI(150)).toBe('Unhealthy for Sensitive Groups'); // Boundary case
    expect(getLabelForAQI(151)).toBe('Unhealthy');
    expect(getLabelForAQI(200)).toBe('Unhealthy'); // Boundary case
    expect(getLabelForAQI(201)).toBe('Very Unhealthy');
    expect(getLabelForAQI(300)).toBe('Very Unhealthy'); // Boundary case
    expect(getLabelForAQI(301)).toBe('Hazardous');
  });
});

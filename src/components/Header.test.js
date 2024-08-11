import { render, screen } from '@testing-library/react';
import Header from './Header'; 
import '@testing-library/jest-dom';

describe('Header Component', () => {
  test('renders Header with correct text and structure', () => {
    // Render the Header component
    render(<Header />);
    
    // Check if the AppBar is rendered
    const appBarElement = screen.getByRole('banner'); // 'banner' role is used for AppBar
    expect(appBarElement).toBeInTheDocument();

    // Check if the Typography component is rendered with the correct text
    const typographyElement = screen.getByText(/AQI Dashboard/i);
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveTextContent('AQI Dashboard');
    
    // Check if Typography has the correct variant using its class name or role
    expect(typographyElement).toHaveClass('MuiTypography-h6'); // MUI applies classes based on the variant
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Event from '../Event'; // Import your React component

describe('Event Component', () => {
  // Example: Test rendering event details
  it('renders event details correctly', () => {
    render(<Event eventName="Test Event" eventDate="2023-01-01" description="Test description" />);
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  // More UI test cases
});

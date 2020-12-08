import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header', () => {
  test('renders Header component', () => {
    render(<Header />);
    const mainHeader = screen.getByRole('heading', {heading: 'Moments...'});
    expect(mainHeader).toBeInTheDocument();

    const subHeader = screen.getByRole('heading', { heading: 'Your fondest memories' });
    expect(subHeader).toBeInTheDocument();
  })
});
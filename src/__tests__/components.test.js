import React from 'react';
import { render, act, screen } from '@testing-library/react';
import App from '../App';
import ImageList from '../components/ImageList';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
    expect(screen.getByText('Order by:')).toBeInTheDocument();
    expect(screen.getByText('Search Moments:')).toBeInTheDocument();
  })
});

describe('ImageList', () => {
  test('renders ImageList component', async () => {
    render(<ImageList />);
    expect(screen.queryByText('Loading...')).toBeNull();
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
  })
})
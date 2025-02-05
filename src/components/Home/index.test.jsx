import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './index';

describe.only('Home test', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('Home renders successfully', async () => {
    render(<Home />);
    jest.advanceTimersByTime(7000);
    screen.debug();

    const element = screen.getByText(/Our Story/i);

    expect(element).toBeInTheDocument();
  });
});

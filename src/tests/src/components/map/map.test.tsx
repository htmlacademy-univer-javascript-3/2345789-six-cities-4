import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Map from '../../../../components/map/map';
import { City } from '../../../../types/offers';
import { Points } from '../../../../types/map';


describe('Map component', () => {
  const city: City = {
    name: 'Test City',
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 10,
    },
  };

  const points: Points = [
    {
      id: '1',
      title: 'Point 1',
      lat: 0,
      lng: 0,
    },
    {
      id: '2',
      title: 'Point 2',
      lat: 1,
      lng: 1,
    },
  ];

  const selectedPoint = points[0];

  it('should render the map container with correct dimensions', () => {
    render(<Map city={city} points={points} selectedPoint={selectedPoint} height="500px" width="100%" />);

    const mapContainerElement = screen.getByTestId('leaflet');

    expect(mapContainerElement).toBeInTheDocument();
    expect(mapContainerElement).toHaveStyle({
      height: '500px',
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    });
  });
});

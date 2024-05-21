import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MutableRefObject } from 'react';
import { Map, TileLayer } from 'leaflet';
import useMap from '../../../hooks/use-map';
import { City } from '../../../types/offers';

// Mock Leaflet Map and TileLayer
vi.mock('leaflet', () => ({
  Map: vi.fn(() => ({
    setView: vi.fn(),
    addLayer: vi.fn(),
  })),
  TileLayer: vi.fn(),
}));

describe('useMap hook', () => {
  const city: City = {
    name: 'Test City',
    location: {
      latitude: 10,
      longitude: 20,
      zoom: 10,
    },
  };

  it('should initialize map and set center and zoom level', () => {
    const mapRef: MutableRefObject<HTMLElement | null> = { current: document.createElement('div') };

    const { result } = renderHook(() => useMap(mapRef, city));

    expect(Map).toHaveBeenCalledWith(mapRef.current, {
      center: { lat: city.location.latitude, lng: city.location.longitude },
      zoom: city.location.zoom,
    });

    expect(TileLayer).toHaveBeenCalledWith(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      expect.any(Object)
    );
    expect(result.current).toBeTruthy();
  });
});

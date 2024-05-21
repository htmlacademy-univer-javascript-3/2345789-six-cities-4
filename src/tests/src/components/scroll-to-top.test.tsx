import { render } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { useLocation } from 'react-router-dom';
import ScrollToTop from '../../../components/scroll-to-top';

vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
}));

describe('ScrollToTop component', () => {
  const mockScrollTo = vi.fn();

  beforeAll(() => {
    Object.defineProperty(window, 'scrollTo', {
      value: mockScrollTo,
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should scroll to top on pathname change', () => {
    (useLocation as Mock).mockReturnValue({ pathname: '/initial' });
    render(<ScrollToTop />);
    expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
  });
});

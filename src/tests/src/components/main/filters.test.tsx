import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Filters from '../../../../components/main/filters';
import { filters } from '../../../../const';

describe('Filters component', () => {
  it('should render with initial state "Popular"', () => {
    const mockHandleSort = vi.fn();
    render(<Filters handleSort={mockHandleSort} />);
    expect(screen.getAllByText(filters.POPULAR).length).toBe(2);
  });

  it('should call handleSort with the correct argument when a filter is clicked', () => {
    const mockHandleSort = vi.fn();
    render(<Filters handleSort={mockHandleSort} />);
    fireEvent.click(screen.getByText(filters.LOW_TO_HIGH));
    expect(mockHandleSort).toHaveBeenCalledWith(filters.LOW_TO_HIGH);
  });

  it('should update the state and active class when a filter is clicked', () => {
    const mockHandleSort = vi.fn();
    render(<Filters handleSort={mockHandleSort} />);
    const highToLowFilter = screen.getByText(filters.HIGH_TO_LOW);
    fireEvent.click(highToLowFilter);
    expect(screen.getAllByText(filters.HIGH_TO_LOW).length).toBe(2);
    expect(highToLowFilter).toHaveClass('placesoption--active');
  });

  it('should switch active class correctly when another filter is clicked', () => {
    const mockHandleSort = vi.fn();
    render(<Filters handleSort={mockHandleSort} />);

    const topRatedFilter = screen.getByText(filters.TOP_RATED);
    fireEvent.click(topRatedFilter);
    expect(topRatedFilter).toHaveClass('placesoption--active');

    const lowToHighFilter = screen.getByText(filters.LOW_TO_HIGH);
    fireEvent.click(lowToHighFilter);
    expect(lowToHighFilter).toHaveClass('placesoption--active');
    expect(topRatedFilter).not.toHaveClass('placesoption--active');
  });
});

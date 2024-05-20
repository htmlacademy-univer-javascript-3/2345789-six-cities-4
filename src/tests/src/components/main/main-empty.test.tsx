import MainEmpty from '../../../../components/main/main-empty';
import { render, screen } from '@testing-library/react';


describe('Component: MainEmpty', () => {
  it('should show empty placeholder', () => {
    render(
      <MainEmpty city={'Cologne'} />
    );

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText('We could not find any property available at the moment in Cologne')).toBeInTheDocument();
  });
});

import Review from '../../../../components/offer/review';
import { describe, it } from 'vitest';
import { comments } from '../../../mock-data';
import { render, screen } from '@testing-library/react';

describe('Component: Review', () => {

  it('should render correctly', () => {
    const comment = comments[0];
    render(
      <Review img={comment.user.avatarUrl} name={comment.user.name} rating={comment.rating} text={comment.comment} date={comment.date}/>
    );

    expect(screen.getByText('Mister Host'));
    expect(screen.getByText('Rating'));
    expect(screen.getByText('goooooooood'));
    expect(screen.getByText('April 2004'));
    expect(screen.getByTestId('rating-bar')).toHaveStyle({ width: '80%' });
  });
});

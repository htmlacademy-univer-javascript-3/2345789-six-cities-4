import ReviewsList from '../../../../components/offer/review-list';
import { describe, it } from 'vitest';
import { comments } from '../../../mock-data';
import { render, screen } from '@testing-library/react';

describe('Component: ReviewList', () => {

  it('should render correctly', () => {
    render(
      <ReviewsList reviews={comments} />
    );

    expect(screen.getByText('Reviews ·'));
    expect(screen.getByText(comments.length)).toHaveClass('reviews__amount');
  });
});

import { ReviewProps } from './types/offers';
import Review from './review';

type ReviewListProps = {
    reviews: ReviewProps[];
}

function ReviewsList({reviews}: ReviewListProps): JSX.Element {
  const offerReviews = reviews.map((item, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <Review key={i} img={item.img} name={item.name} rating={item.rating} text={item.text} date={item.date} />
  ));
  return (
    <div>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {offerReviews}
      </ul>
    </div>
  );
}

export default ReviewsList;

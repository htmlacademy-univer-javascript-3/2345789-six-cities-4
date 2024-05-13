import { Comment } from '../../types/offers';
import Review from './review';

type ReviewListProps = {
    reviews: Comment[];
}

function ReviewsList({reviews}: ReviewListProps): JSX.Element {
  const offerReviews = reviews.map((item) => (
    <Review key={`${item.id}`} img={item.user.avatarUrl} name={item.user.name} rating={item.rating} text={item.comment} date={item.date} />
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

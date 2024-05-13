import { ReviewProps } from '../../types/review';

function Review(props: ReviewProps): JSX.Element {
  const date = new Date(props.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={props.img} width="54" height="54" alt="Reviews avatar"></img>
        </div>
        <span className="reviews__user-name">
          {props.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${(props.rating / 5) * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {props.text}
        </p>
        <time className="reviews__time" dateTime={props.date}>{formattedDate}</time>
      </div>
    </li>
  );
}

export default Review;

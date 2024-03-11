import CardsList from './cardsList';
import Header from './header';
import Offer from './types/offers';
import {useParams} from 'react-router-dom';
import Error404 from './404';
import ReviewForm from './review-form';

type OfferProps = {
    offers: Offer[];
}

function OfferScreen({offers}: OfferProps): JSX.Element {
  const params = useParams();
  const offer = offers.find((o) => o.id === params.id);
  if (!offer) {
    return (<Error404 />);
  }

  const otherOffers = offers.filter((e) => e !== offer);

  const offerImages = offer.images.map((item, i) => {
    const photoAlt = `Photo studio ${i}`;
    return (
      // eslint-disable-next-line react/no-array-index-key
      <div className="offer__image-wrapper" key={i}>
        <img className="offer__image" src={item} alt={photoAlt} ></img>
      </div>
    );
  });

  const offerFeatures = offer.features.map((item, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <li className="offer__feature offer__feature--entire" key={i}>
      {item}
    </li>
  ));

  const offerInside = offer.inside.map((item, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <li className="offer__inside-item" key={i}>
      {item}
    </li>
  ));

  const offerReviews = offer.reviews.map((item, i) => {
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
    return (
    // eslint-disable-next-line react/no-array-index-key
      <li className="reviews__item" key={i}>
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img className="reviews__avatar user__avatar" src={item.img} width="54" height="54" alt="Reviews avatar"></img>
          </div>
          <span className="reviews__user-name">
            {item.name}
          </span>
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <span style={{width: `${item.rating}%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <p className="reviews__text">
            {item.text}
          </p>
          <time className="reviews__time" dateTime={item.date}>{formattedDate}</time>
        </div>
      </li>
    );
  });

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offerImages}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className="offer__mark">
                <span>{offer.class}</span>
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.name}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: '80%'}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                {offerFeatures}
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{`${offer.price}`}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offerInside}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={offer.host.img} width="74" height="74" alt="Host avatar"></img>
                  </div>
                  <span className="offer__user-name">
                    {offer.host.name}
                  </span>
                  <span className="offer__user-status">
                    {offer.host.status}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
                <ul className="reviews__list">
                  {offerReviews}
                </ul>
                <ReviewForm />
              </section>
            </div>
          </div>
          <section className="offer__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <CardsList cards={otherOffers.map((item) => ({id: item.id, price: item.price, isInBookmarks: item.isInBookmarks, roomName: item.name, roomType: item.features[0]}))} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;

import CardsList from './cardsList';
import Header from './header';
import { Offer } from './types/offers';
import {useParams} from 'react-router-dom';
import Error404 from './404';
import ReviewForm from './review-form';
import ReviewsList from './review-list';
import Map from './map';
import { fetchSingleOfferAction, fetchСommentsAction } from './api/api-actions';
import LoadingScreen from './loading-screen';
import { useAppSelector, useAppDispatch } from './hooks';
import { useEffect } from 'react';

type OfferProps = {
    offers: Offer[];
}

function OfferScreen({offers}: OfferProps): JSX.Element {
  const params = useParams();
  const offer = offers.find((o) => o.id === params.id);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (offer?.id) {
      dispatch(fetchSingleOfferAction({id: offer.id}));
      dispatch(fetchСommentsAction({id: offer.id}));
    }
  }, [dispatch, offer?.id]);
  const currentOffer = useAppSelector((state) => state.currentOffer);
  const currentComments = useAppSelector((state) => state.currentComments);
  if (!offer) {
    return (<Error404 />);
  }
  if (!currentOffer) {
    return <LoadingScreen />;
  }

  const points = offers.map((item) => ({
    id: item.id,
    title: item.title,
    lat: item.location.latitude,
    lng: item.location.longitude
  }));
  const selectedPoint = points.find((o) => o.title === offer.title);
  const otherOffers = offers.filter((e) => e !== offer);

  const offerImages = currentOffer?.images.map((item, i) => {
    const photoAlt = `Photo studio ${i}`;
    return (
      <div className="offer__image-wrapper" key={`${photoAlt}`}>
        <img className="offer__image" src={item} alt={photoAlt} ></img>
      </div>
    );
  });

  const features = [
    currentOffer?.type.toLowerCase().replace(/\w/, (firstLetter) => firstLetter.toUpperCase()),
    `${currentOffer?.bedrooms} Bedrooms`,
    `Max ${currentOffer?.maxAdults} adults`
  ];

  const offerFeatures = features.map((item) => (
    <li className="offer__feature offer__feature--entire" key={`${item}`}>
      {item}
    </li>
  ));

  const offerInside = currentOffer?.goods.map((item) => (
    <li className="offer__inside-item" key={`${item}`}>
      {item}
    </li>
  ));

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
                <span>{currentOffer?.isPremium ? 'Premium' : 'Economy'}</span>
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer?.title}
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
                    <img className="offer__avatar user__avatar" src={currentOffer?.host.avatarUrl} width="74" height="74" alt="Host avatar"></img>
                  </div>
                  <span className="offer__user-name">
                    {currentOffer?.host.name}
                  </span>
                  <span className="offer__user-status">
                    {currentOffer?.host.isPro ? 'Pro' : 'New'}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer?.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList reviews={currentComments} />
                <ReviewForm offerId={currentOffer.id} />
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map city={currentOffer?.city} points={points} selectedPoint={selectedPoint} height='600px' width='1200px' />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <CardsList cards={otherOffers.map((item) => ({id: item.id, price: item.price, rating: item.rating, roomName: item.title, roomType: item.type, image: item.previewImage}))} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;

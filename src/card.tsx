import { useState } from 'react';
import { CardProps } from './types/cardProps';
import {NavLink} from 'react-router-dom';
import ScrollToTop from './scroll-to-top';


function CardArticle(props: CardProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState('');
  function handleMouseOver() {
    if (props.onListItemHover) {
      props.onListItemHover(props.roomName);
    }
    setActiveOfferId(props.id);
  }

  let bookmark;
  if (props.isInBookmarks) {
    bookmark = 'In bookmarks';
  } else {
    bookmark = 'To bookmarks';
  }
  return (
    <article className="cities__card place-card" onMouseOver={handleMouseOver}>
      <div className="citiesimage-wrapper place-cardimage-wrapper">
        <a href="#">
          <img className="place-card__image" src="img/room.jpg" width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{props.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-cardbookmark-button place-cardbookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use href="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{bookmark}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-cardstars ratingstars">
            <span style={{ width: '80%' }}></span> {/* Adjusted style attribute */}
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <ScrollToTop />
          <NavLink to={`/offer/${activeOfferId}`} >{props.roomName}</NavLink>
        </h2>
        <p className="place-card__type">{props.roomType}</p>
      </div>
    </article>
  );
}

export default CardArticle;

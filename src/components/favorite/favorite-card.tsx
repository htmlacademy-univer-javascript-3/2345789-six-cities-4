import { useState } from 'react';
import { CardProps } from '../../types/cardProps';
import {NavLink} from 'react-router-dom';
import ScrollToTop from '../scroll-to-top';
import { memo } from 'react';
import { updateFavorite } from '../../api/api-actions';
import { useAppDispatch } from '../../hooks';
import { FavoritesStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import { updateFavoritesCount } from '../../store/action';


function FavoriteCardArticle(props: CardProps): JSX.Element {
  const isAuthorized = useAppSelector((state) => state.user.authorizationStatus);
  const favoritesCounter = useAppSelector((state) => state.favorite.favoritesCounter);
  const [activeOfferId, setActiveOfferId] = useState('');
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);
  const dispatch = useAppDispatch();
  function handleMouseOver() {
    if (props.onListItemHover) {
      props.onListItemHover(props.id);
    }
    setActiveOfferId(props.id);
  }
  function handleIsFavorite() {
    if (isFavorite) {
      dispatch(updateFavorite({
        id: props.id,
        status: FavoritesStatus.DELETE
      }));
      setIsFavorite(false);
      dispatch(updateFavoritesCount(favoritesCounter - 1));
    } else {
      dispatch(updateFavorite({
        id: props.id,
        status: FavoritesStatus.ADD
      }));
      setIsFavorite(true);
      dispatch(updateFavoritesCount(favoritesCounter + 1));
    }
  }
  let authorizedSection;
  if (isAuthorized === AuthorizationStatus.Auth) {
    authorizedSection = (
      <button className={isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button" onClick={handleIsFavorite}>
        <svg className="place-card__bookmark-icon" width="18" height="19">
          <use href="#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden">To Bookmarks</span>
      </button>
    );
  }
  return (
    <article className="favorites__card place-card" onMouseOver={handleMouseOver}>
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={`${props.image}`} width="150" height="110" alt="Place image" />
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{props.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {authorizedSection}
        </div>
        <div className="place-card__rating rating">
          <div className="place-cardstars ratingstars">
            <span style={{ width: '80%' }}></span>
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

export default memo(FavoriteCardArticle);

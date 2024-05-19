import {NavLink} from 'react-router-dom';

function Error404(): JSX.Element {
  return (
    <div>
      <h1>Ошибка 404. Страница не существует.</h1>
      <NavLink to="/">
        Главная
      </NavLink>
    </div>
  );
}

export default Error404;

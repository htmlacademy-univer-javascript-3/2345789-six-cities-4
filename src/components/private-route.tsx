import {Navigate} from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { AuthorizationStatus } from '../const';
import LoadingScreen from './loading-screen';

type PrivateRouteProps = {
    children: JSX.Element;
  };

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const isUserDataLoading = useAppSelector((state) => state.user.isUserDataLoading);
  const isAuthorized = useAppSelector((state) => state.user.authorizationStatus);
  if (isUserDataLoading || isAuthorized === AuthorizationStatus.Unknown) {
    return <LoadingScreen />;
  }
  return isAuthorized === AuthorizationStatus.Auth ? children : <Navigate to={'/login'} />;
}

export default PrivateRoute;

import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

export function withHistory(component: JSX.Element) {
  return (
    <BrowserRouter>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </BrowserRouter>
  );
}

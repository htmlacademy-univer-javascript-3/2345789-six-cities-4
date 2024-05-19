import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

export function mockComponent(component: JSX.Element) {
  return (
    <BrowserRouter>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </BrowserRouter>
  );
}

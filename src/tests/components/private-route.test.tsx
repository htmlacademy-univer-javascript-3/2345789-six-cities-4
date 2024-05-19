import { render, screen } from '@testing-library/react';
import Error404 from '../../components/404';
import { withHistory } from '../mock-component';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const expectedHeaderText = 'Ошибка 404. Страница не существует.';
    const expectedLinkText = 'Главная';

    render(withHistory(<Error404 />));

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';

import ErrorBoundary from './ErrorBoundary';

const fallbackText = 'Возникла ошибка';

function Dummy() {
  throw new Error('Test');
  return <div>Dummy component</div>;
}

test('Example test', async () => {
  render(
    <ErrorBoundary fallback={<div>{fallbackText}</div>}>
      <Dummy />
    </ErrorBoundary>,
  );

  expect(screen.getByText(fallbackText)).toBeDefined();
});

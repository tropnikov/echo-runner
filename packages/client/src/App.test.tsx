import { RouterProvider } from 'react-router';

import { render } from '@testing-library/react';

import { createRouter } from './routes';

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

test('Example test', async () => {
  const router = createRouter();
  render(<RouterProvider router={router} />);
});

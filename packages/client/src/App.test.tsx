import { RouterProvider } from 'react-router';

import { render } from '@testing-library/react';

import router from './routes';

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

test('Example test', async () => {
  if (router) {
    render(<RouterProvider router={router} />);
  }
});

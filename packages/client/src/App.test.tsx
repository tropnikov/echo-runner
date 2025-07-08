import { TextDecoder as NodeTextDecoder, TextEncoder } from 'node:util';

import { render, screen } from '@testing-library/react';

import App from './App';

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}

if (!global.TextDecoder) {
  global.TextDecoder = NodeTextDecoder as typeof TextDecoder;
}

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

test('Example test', async () => {
  render(<App />);
});

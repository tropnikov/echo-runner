import { TextDecoder, TextEncoder } from 'util';

import '@testing-library/jest-dom';

// Polyfill for TextEncoder
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder as typeof global.TextEncoder;
}

if (typeof window.TextEncoder === 'undefined') {
  window.TextEncoder = global.TextEncoder;
}

// Polyfill for TextDecoder
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder as typeof global.TextDecoder;
}

if (typeof window.TextDecoder === 'undefined') {
  window.TextDecoder = global.TextDecoder;
}

// Mock fetch for fetchBaseQuery
global.fetch = jest.fn();

// Mock the document.head for react-helmet-async
Object.defineProperty(document, 'head', {
  value: {
    ...document.head,
    add: jest.fn(),
    remove: jest.fn(),
    appendChild: jest.fn(),
    removeChild: jest.fn(),
    insertBefore: jest.fn(),
    querySelectorAll: jest.fn(() => []),
    querySelector: jest.fn(() => null),
  },
  writable: true,
});

console.log('Polyfill for TextEncoder/TextDecoder loaded.');

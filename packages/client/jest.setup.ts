import { TextDecoder, TextEncoder } from 'util';

import '@testing-library/jest-dom';
import 'jest-canvas-mock';

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

console.log('Polyfill for TextEncoder/TextDecoder loaded.');

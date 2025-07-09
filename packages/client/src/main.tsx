import { RouterProvider } from 'react-router';

import ReactDOM from 'react-dom/client';

import router from './routes';

import './index.css';

const root = document.getElementById('root');

ReactDOM.createRoot(root as HTMLElement).render(<RouterProvider router={router} />);

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch, useSelector, useStore } from 'react-redux';

import { api } from '@/api/generated';

import type { PageInitContext } from '../types/pageContext';
import authReducer from './slices/auth';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
});

export function makeStore(
  preloadedState?: Partial<ReturnType<typeof rootReducer>>,
  extraArgument?: { ctx: PageInitContext },
) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware({
        thunk: {
          extraArgument,
        },
      });
      return middleware.concat(api.middleware);
    },
    preloadedState,
  });
}

setupListeners(makeStore().dispatch);

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;

declare global {
  interface Window {
    __APP_INITIAL_STATE__?: RootState;
  }
}

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

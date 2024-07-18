/**
 * Store
 */
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {configureStore as ReduxStore} from '@reduxjs/toolkit';
import rootReducer from '../reducers';

/**
 *
 * @returns
 */
const configureStore = () => {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['userReducer'],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = ReduxStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({serializableCheck: false}),
  });
  let persistor = persistStore(store);
  return {store, persistor};
};

export default configureStore;

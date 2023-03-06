import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './reducers'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

export const middlewares = [sagaMiddleware]

const devTools =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middlewares)
    : composeWithDevTools(applyMiddleware(...middlewares))

export type RootState = ReturnType<typeof reducers>

export const store = createStore(reducers, devTools)

sagaMiddleware.run(sagas)

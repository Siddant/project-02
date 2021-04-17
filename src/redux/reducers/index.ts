import { combineReducers } from 'redux'

import movies from './movieReducer'

const rootReducer = combineReducers({ movies })

export default rootReducer

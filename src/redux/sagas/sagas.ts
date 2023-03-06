import { fork } from 'redux-saga/effects'

import movieSaga from './movieSaga'

const sagas = [fork(movieSaga)]

export default sagas

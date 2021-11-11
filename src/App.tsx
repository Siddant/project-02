import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import 'bulma'
import './style.scss'
import { store } from './redux'

import Home from './components/Home'
import MoviesShow from './components/MoviesShow'
import CinemasNear from './components/CinemasNear'
import Nav from './components/Nav'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <main>
        <Nav />
        <Routes>
          <Route path="/cinemas" element={<CinemasNear />} />
          <Route path="/movies/:id" element={<MoviesShow />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

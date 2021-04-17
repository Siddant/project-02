import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bulma'
import './style.scss'
import { store } from './redux'

import Home from './components/Home'
import MoviesShow from './components/MoviesShow'
// import CinemasNear from './components/CinemasNear'
import Nav from './components/Nav'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <main>
        <Nav />
        <Switch>
          {/* <Route path="/cinemas" component={CinemasNear} /> */}
          <Route path="/movies/:id" component={MoviesShow} />
          <Route path="/" component={Home} exact />
        </Switch>
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

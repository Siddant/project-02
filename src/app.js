import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bulma'
import './style.scss'

import Home from './components/Home.js'
import MoviesShow from './components/MoviesShow.js'
import CinemasNear from './components/CinemasNear.js'
import Nav from './components/Nav.js'


class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <main>
          <Nav />
          <Switch>
            <Route path="/cinemas" component={CinemasNear} />
            <Route path="/movies/:id" component={MoviesShow} />
            <Route path="/" component={Home}/>
          </Switch>
        </main>
      </BrowserRouter>

    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

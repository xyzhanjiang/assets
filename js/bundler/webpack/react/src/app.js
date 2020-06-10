import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Index from './views/index'
import Post from './views/post'
import Login from './views/login'

export default () => {
  const [user, setUser] = useState(null)

  function login(data) {
    setUser(data)
  }

  return (
    <Router>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
          </a>
          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/">Home</Link>
          </div>
          <div className="navbar-end">
            {user ? <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">{user.name}</a>
              <div className="navbar-dropdown">
                <a className="navbar-item" href="/logout">Logout</a>
              </div>
            </div> : <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <Link className="button is-small is-info is-outlined" to="/login">
                    <span>Login</span>
                  </Link>
                </p>
              </div>
            </div>} 
          </div>
        </div>
      </nav>
      <Switch>
        <Route path="/login">
          <Login login={login}/>
        </Route>
        <Route path="/posts/:id">
          <Post/>
        </Route>
        <Route path="/">
          <Index/>
        </Route>
      </Switch>
    </Router>
  )
}

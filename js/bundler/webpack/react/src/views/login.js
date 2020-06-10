import React, { useState } from 'react'
import axios from 'axios'

export default (props) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    axios.post('/login', {
      name,
      password
    }).then(({ data }) => {
      props.login({
        name,
        ...data
      })
    })
  }

  return (
    <div className="container">
      <div className="column is-4 is-offset-4">
        <div className="card">
          <div className="card-content content">
            <form action="#" method="post" onSubmit={handleSubmit}>
              <h2>Login</h2>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    className="input"
                    name="name"
                    onChange={({ target }) => setName(target.value)}
                    type="text"
                    placeholder="Name"/>
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    name="password"
                    onChange={({ target }) => setPassword(target.value)}
                    type="password"
                    placeholder="Password"/>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-link" type="submit">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

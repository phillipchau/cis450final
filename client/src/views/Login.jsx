import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const checkLogin = async () => {
    const data = await axios.get('http://localhost:8081/getlogin', {withCredentials: true})
    console.log(data)
    if (data.data && data.data !== "") {
      history.push('/')
    }
  }

  const signin = async () => {
    const data = await axios.post('http://localhost:8081/login', { username, password }, {withCredentials: true})
    if (typeof data.data === 'string' && data.data.startsWith('ERROR:')) {
      alert('An error occured while logging in')
    } else {  
      console.log(data)
      history.push(`/`)
    }
  }

  useEffect(() => {
    checkLogin()
  },[])

  return (
    <>
      <div id="loginbody">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <h1>COVID19 Dashboard</h1>
                  <h2 className="text-secondary">Login</h2>
                  <form onSubmit={e => {
                    e.preventDefault()
                    signin()
                    setUsername('')
                    setPassword('')
                  }}
                  >
                    <div className="form-group">
                      <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} type="text" id="username" name="username" placeholder="Username" required />
                    </div>
                    <div className="form-group">
                      <input className="form-control" value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Password" required />
                    </div>
                    <div className="form-group form-row">
                      <button type="submit" className="btn btn-primary">Log In</button>
                      <p style={{marginLeft: 20}}className="signup-margin text-secondary">
                        New to COVID19 Dashboard?
                        <Link to="/signup"> Sign Up Here</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p style={{textAlign: 'center'}}className="text-secondary bot-margin">Created by G36</p>
      </div>
    </>
  )
}
export default Login

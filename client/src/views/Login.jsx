import React, { useState, useEffect } from 'react'
import { signin, checkLogin } from '../api/Login';
import { useHistory, useLocation, Link } from 'react-router-dom'
import ErrorMessage from '../components/core/Error';
import GoogleLogin from '../components/core/GoogleLogin';

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // Hold error text.
  const [error, setError] = useState('');

  const history = useHistory();
  const location = useLocation();

  const redirectAction = () => history.replace(location.state?.from || '/user');


  useEffect(() => {
    checkLogin().then((res) => {
      if (res !== "") {
        history.push('/')
      }
    }).catch((err) => {
      setError(err.message);
    });
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
                    signin(username, password)
                      .then((res) => {
                        history.push('/')
                      }).catch((err) => {
                        setError(err.message);
                      });
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
                      <GoogleLogin successAction={redirectAction} errorAction={setError} />
                      <p style={{marginLeft: 20}}className="signup-margin text-secondary">
                        New to COVID19 Dashboard?
                        <Link to="/signup"> Sign Up Here</Link>
                      </p>
                      { error ? <ErrorMessage message={error} /> : null }
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

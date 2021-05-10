import React, {useState, useEffect} from 'react'
import { getStates } from '../api/MapData';
import { signup } from '../api/Login';
import ErrorMessage from '../components/core/Error';
import { useHistory, Link } from 'react-router-dom'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fname, setFName] = useState('')
  const [lname, setLName] = useState('')
  const [state, setState] = useState('')
  const [stateList, setStateList] = useState([])

  // Hold error text.
  const [error, setError] = useState('');

  const history = useHistory()
 
  useEffect(() => {
    getStates().then((res) => {
      setStateList(res);
      setState(res[0].State)
    }).catch((err) => {
      console.log(err)
    });
  }, [])
  return (
    <>
      <div>
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <h1>Create an account</h1>
                  <p className="text-secondary">Get started on PennConnects!</p>
                  <form onSubmit={e => {
                    e.preventDefault()
                    signup(username, password, fname, lname, state)
                      .then((res) => {
                        history.push('/')
                      }).catch((err) => {
                        setError(err.message);
                      });
                    setUsername('')
                    setPassword('')
                    setState('')
                    setFName('')
                    setLName('')
                  }}
                  >
                    <div className="form-group">
                      <label htmlFor="fname"> Name: </label>
                      <div className="form-row">
                        <div className="col-6">
                          <input className="form-control" type="text" id="fname" name="fname" value={fname} onChange={e => setFName(e.target.value)} placeholder="First Name" required />
                        </div>
                        <div className="col-6">
                          <input className="form-control" type="text" id="lname" name="lname" value={lname} onChange={e => setLName(e.target.value)} placeholder="Last Name" required />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="username"> Login: </label>
                      <input className="form-control" type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                    </div>
                    <div className="form-group">
                      <input className="form-control" type="text" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="stateselector"> My Home State: </label>
                      <br/>
                      <select id="stateselector" class="form-select" aria-label="State Selector" value={state} onChange={e => setState(e.target.value)}>
                        {stateList.map((place, k) => {
                          return (
                            <>
                              <option key={k} value={place.State}>{place.State}</option>
                            </>
                          )})}
                      </select>
                    </div>
                    <div className="form-group">
                      <p className="signup-margin text-secondary">
                        Already have an account?
                        <Link to="/login"> Return to login page</Link>
                      </p>
                      { error ? <ErrorMessage message={error} /> : null }
                      <button className="btn btn-primary float-right" type="submit">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Signup

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { signupApi } from '../apis/fetchApi';

function Signup() {

  const [user, setUser] = useState({ username: "", email: "", password: "" })
  const navigate = useNavigate()  
  const formSubmit = () => {
    const { username, email, password } = user
    if (!username || !email || !password) {
      toast.warning("invalid input")
    }
    else {
      signupApi(user).then((res) => {
        console.log(res.data);
        toast.success("registration successful")
        navigate('/')
      })
    }
  }
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: '30rem' }}>
        <div className="text-center mb-4">
          <h2 className="text-primary">Sign Up</h2>
        </div>
        <form>
          <div className="row">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your username"
                required
                onChange={(e) => { setUser({ ...user, username: e.target.value }) }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required
                onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                required
                onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
              />
            </div></div>
          <button type="submit" className="btn btn-primary w-100" onClick={(e) => { formSubmit() }}>Sign Up</button>
        </form>
        <div className="text-center mt-3">
          <p className="mb-0">
            Already have an account?{' '}
            <Link to={'/'} className="text-primary text-decoration-none" >Log In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
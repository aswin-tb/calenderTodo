import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { loginApi } from '../apis/fetchApi';

function Login() {
    const [user, setUser] = useState({ username: "", password: "" })
    console.log(user);
    
    const navigate = useNavigate()
    const formSubmit = () => {
        const { username, password } = user
        if (!username || !password) {
            toast.warning("invalid input")
        }
        else {
            loginApi(user).then((res) => {
                toast.success("Login successful")
                sessionStorage.setItem("token", res.data.token)
                navigate('/list')
            })
        }
    }


    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ width: '22rem' }}>
                <div className="text-center mb-4">
                    <h2 className="text-primary">Login</h2>
                </div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Username</label>
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
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                            required
                            onChange={(e) => { setUser({ ...user, password: e.target.value }) }}

                        />
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="rememberMe"
                            />
                            <label htmlFor="rememberMe" className="form-check-label">
                                Remember Me
                            </label>
                        </div>
                        <Link className="text-decoration-none text-primary small">
                            Forgot Password?
                        </Link>
                    </div>
                    <button type="button" className="btn btn-primary w-100" onClick={(e) => { formSubmit(e) }}>Login</button>
                </form>
                <div className="text-center mt-3">
                    <p className="mb-0">
                        Don't have an account?{' '}
                        <Link to={'/signup'} className="text-primary text-decoration-none">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
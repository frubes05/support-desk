import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import {login, reset} from '../features/auth/authSlice';
import { useNavigate } from "react-router-dom";
import {Spinner} from '../components/Spinner';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();

  const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/')
    } 
    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])


  const onChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password
    }
    dispatch(login(userData));
    navigate('/')
  }

  if (isLoading) return <Spinner></Spinner>

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt></FaSignInAlt>
          Login
        </h1>
        <p>Please login to get support</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name='email'
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name='password'
              id="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Login</button>
          </div>
        </form>
      </section>
    </>
  );
};


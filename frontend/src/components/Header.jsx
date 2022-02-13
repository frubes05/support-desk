import React from 'react';
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {logout, reset} from '../features/auth/authSlice';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);

  const onLogout = () => {
      dispatch(logout());
      dispatch(reset());
      navigate('/');
  }

  return (
    <header className='header'>
        <div className="logo">
            <Link to="/">Support Desk</Link>
        </div>
        <ul>
            {user && <li>
                <button className='btn' onClick={onLogout}>
                    <FaSignOutAlt></FaSignOutAlt>
                    Logout
                </button>
            </li>}
            {!user && <>
                <li>
                <Link to='/login'>
                    <FaSignInAlt>Login</FaSignInAlt>
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    <FaUser>Register</FaUser>
                </Link>
            </li>
            </> }
        </ul>
    </header>
  )
}
